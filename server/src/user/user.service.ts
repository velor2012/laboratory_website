import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Transaction, TransactionManager, EntityManager } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';
import { CreateAdviserDto } from 'src/adviser/dto/create-adviser.dto';
import { CreateResearcherDto } from 'src/researcher/dto/create-researcher.dto';
import { CreateStuDto } from 'src/stu/dto/create-stu.dto';
import { async } from 'rxjs';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Adviser } from 'src/adviser/entities/adviser.entity';
import { Researcher } from 'src/researcher/entities/researcher.entity';
import { Stu } from 'src/stu/entities/stu.entity';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt'
import { ImgUploadService } from 'src/lib/upload/upload.sevice';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('ImgUploadService') private readonly ImgUploadService: ImgUploadService,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.usersRepository.find({skip:pageSize * (page - 1),take:pageSize});
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(+id);
  }
  async findOneByName(username: string,selectPassword:boolean) {
    if(selectPassword){
      return await this.usersRepository.findOne({username:username},{select:["password","username","id"]});
    }
    return await this.usersRepository.findOne({username:username});
  }
  async remove(id: number) {
    return await this.usersRepository.delete(+id);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    var user = this.usersRepository.create(updateUserDto)
    return await this.usersRepository.update(+id,user);
  }

  async upload(file:any,user:User){
    let res = await this.ImgUploadService.upload(file);
    return res
  }

  async findRelationsByUserId(id: number,relation: string) {
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
    // 加密密码
    createUserDto.password = bcrypt.hashSync(createUserDto.password ,10)
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