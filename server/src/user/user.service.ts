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
    let res1 = null
    let res2 = null
    const a = await getManager().transaction(async TransactionManager=>{
    let user = await TransactionManager.findOne(User,id,{relations:['teacher','stu','adviser','researcher']});
    res2 = await TransactionManager.remove(User,user);
    switch (user.relation){
        case 1:
            res1 = await TransactionManager.remove(Teacher,user.teacher);
        case 2:
            res1 = await TransactionManager.remove(Adviser,user.adviser);
        case 3:
            res1 = await TransactionManager.remove(Researcher,user.researcher);
        case 4:
            res1 = await TransactionManager.remove(Stu,user.stu);
    }
    }).catch(e=>{
      throw new HttpException('删除失败',HttpStatus.BAD_REQUEST)
    })
    return {res1,res2};
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id,updateUserDto);
  }

  async upload(file:any,user:User){
    let res = await this.ImgUploadService.upload(file);
    return res
  }

  async findRelationsByUserId(id: number,relation: string,pageSize:number,page:number) {
    return await this.usersRepository.createQueryBuilder()
    .relation(User, relation)
    .of(id)
    .loadMany();
  }

  async create(createUserDto: CreateUserDto) {
    var p1: Teacher | Adviser | Researcher | Stu;
    // var user: User
    const exite_user = await this.usersRepository.findOne({username:createUserDto.username})
    if(exite_user != null){
      throw new HttpException("用户已存在",HttpStatus.BAD_REQUEST)
    }

    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
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