import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Transaction, TransactionManager, EntityManager } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Adviser } from 'src/adviser/entities/adviser.entity';
import { Researcher } from 'src/researcher/entities/researcher.entity';
import { Stu } from 'src/stu/entities/stu.entity';
import * as _ from 'lodash';
import { ImgUploadService } from 'src/lib/upload/upload.sevice';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('ImgUploadService') private readonly ImgUploadService: ImgUploadService,
  ) {}

  async findAll(pageSize:number, page:number,withRelation:boolean = false) {
    return await this.usersRepository.find({skip:pageSize * (page - 1),take:pageSize,
      relations:withRelation?["papers","competitions","projects","patents"]:[]});
  }

  async findAllName() {
    return await this.usersRepository.find({select:['realname','id']});
  }

  async getTotal() {
    return await this.usersRepository.count()
  }

  async findOne(id: number,withRelation:boolean = false) {
    return await this.usersRepository.findOne(+id,{relations:withRelation?["papers","competitions","projects","patents"]:[]});
  }
  async findOneByName(username: string,selectPassword:boolean = false,withRelation:boolean = false) {
    if(selectPassword){
      return await this.usersRepository.findOne({username:username},{select:["password","username","id","role"],
      relations:withRelation?["papers","competitions","projects","patents"]:[]});
    }
    return await this.usersRepository.findOne({username:username});
  }
  async remove(id: number) {
    return await this.usersRepository.delete(+id);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    var p1: Teacher | Adviser | Researcher | Stu;
    var user = this.usersRepository.create(updateUserDto)
    let res = null
    const a = await getManager().transaction(async TransactionManager=>{
    user = TransactionManager.create(User,updateUserDto)
    res = await TransactionManager.update(User,+id,user);
    if(String(user.relation) == '1'){
        // 老师
        var teacher = TransactionManager.create(Teacher,{avatar:user.avatar})
        res = await TransactionManager.update(Teacher,id,teacher)
        }else if(String(user.relation) == '2'){
        // 顾问
        var adviser = TransactionManager.create(Adviser,{avatar:user.avatar})
        res = await TransactionManager.update(Adviser,id,adviser)
        }else if(String(user.relation) == '3'){
        // 研究员
        var researcher = TransactionManager.create(Researcher,{avatar:user.avatar})
        res = await TransactionManager.update(Researcher,id,researcher)
        }else if(String(user.relation) == '4'){
        // 学生
        var stu = TransactionManager.create(Stu,{avatar:user.avatar})
        res = await TransactionManager.update(Stu,id,teacher)
        }else{
            throw new HttpException('BAD_REQUEST',HttpStatus.BAD_REQUEST)
        }
        }).catch(e=>{
            throw new HttpException('创建失败',HttpStatus.BAD_REQUEST)
        })
    return res;
  }

  async upload(file:any,user:User){
    let res = await this.ImgUploadService.upload(file);
    return res
  }

  async findRelationsByUserId(id: number,relation: string,pageSize:number,page:number) {
    return await this.usersRepository.createQueryBuilder()
    .relation(User, relation)
    .of(id) // 也可以使用post id
    .loadMany();
  }

  async create(createUserDto: CreateUserDto) {
    var p1: Teacher | Adviser | Researcher | Stu;
    var user: User
    const exite_user = await this.usersRepository.findOne({username:createUserDto.username})
    if(exite_user != null){
      throw new HttpException("用户已存在",HttpStatus.BAD_REQUEST)
    }
    // // 加密密码
    // createUserDto.password = bcrypt.hashSync(createUserDto.password ,10)
    const a = await getManager().transaction(async TransactionManager=>{
    user = TransactionManager.create(User,createUserDto)
    user = await TransactionManager.save(User,user);
    if(String(createUserDto.relation) == '1'){
      // 老师
      createUserDto.teacher.id = user.id
      const teacher = TransactionManager.create(Teacher,createUserDto.teacher)
      p1 = await TransactionManager.save(Teacher,teacher)
    }else if(String(createUserDto.relation) == '2'){
      // 顾问
      createUserDto.adviser.id = user.id
      const adviser = TransactionManager.create(Adviser,createUserDto.adviser)
      p1 = await TransactionManager.save(Adviser,adviser)
    }else if(String(createUserDto.relation) == '3'){
      // 研究员
      createUserDto.researcher.id = user.id
      const researcher = TransactionManager.create(Researcher,createUserDto.researcher)
      p1 = await TransactionManager.save(Researcher,researcher)
    }else if(String(createUserDto.relation) == '4'){
      // 学生
      createUserDto.stu.id = user.id
      const stu = TransactionManager.create(Stu,createUserDto.stu)
      p1 = await TransactionManager.save(Stu,stu)
    }else{
      throw new HttpException('BAD_REQUEST',HttpStatus.BAD_REQUEST)
    }
    }).catch(e=>{
      throw new HttpException('创建失败',HttpStatus.BAD_REQUEST)
    })
    return {p1,user}
  }

  logout(user: User) { 
      return 'ok'
  }
  async deleteRelation(id:number,relation_name:string,relation:any){
    return await this.usersRepository.createQueryBuilder()
    .relation(User, relation_name)
    .of(id) // 也可以使用post id
    .remove(relation);
  }
  async addRelation(id:number,relation_name:string,relation:any){
    return await this.usersRepository.createQueryBuilder()
    .relation(User, relation_name)
    .of(id) // 也可以使用post id
    .add(relation);
  }

  async user_auth_check(user_id1:number,user_role1:number,user_id2:number){
    if( user_id2==user_id1 || user_role1 == 1 ){
      return true
    }
    // const de_user = await this.findOne(+user_id2)
    // if(de_user && de_user.role > user_role1){
    //   return true
    // }
    return false
  }
}