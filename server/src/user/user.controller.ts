import { Controller, Get, Param, Req, Post, Delete, Put, Body, HttpException, HttpStatus, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {User as CUser} from 'src/lib/decorator/user.decorator'
import Auth from 'src/lib/decorator/auth.decorator';
import LoginDto from './dto/login.dto';
import { AuthService } from 'src/lib/auth/auth.service';
import * as _ from 'lodash'
import { RelationDto } from 'src/lib/common_dto/relation.dto';
import SearchDTO from 'src/lib/common_dto/search.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags("users")
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

  @Get()
  @Auth("获取所有用户")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page,withRelation } = searchDto 
    const users =  await this.userService.findAll(+pageSize, +page,withRelation);
    return users
  }

  @Get("currentUser")
  @Auth("获取登陆的用户信息",null,"jwt")
  async currentUser(@CUser() user:User,@Query() withRelation:boolean = false) {
      //sign的参数必须使用对象，否则无法设置过期时间
      return this.userService.findOne(user.id,withRelation)
  }
  

  @Get("name/:username")
  @Auth("通过账号获取一个用户")
  async findOnebyName(@Param("username") username: string, @Req() req, @Query() withRelation:boolean = false) {
      if (!req) return "";
      return await this.userService.findOneByName(username,withRelation);
  }
  
  @Get("relations/:id")
  @Auth("获取一个用户的所有项目")
  async findRelationsByUserId(@Param("id") id: number,@Query() relationDto: RelationDto) {
    let { relation, pageSize, page } = relationDto 
    return await this.userService.findRelationsByUserId(id,relation, pageSize, page);
  }
  @Get("allName")
  @Auth("获取所有用户名")
  async findAllName(@Req() req) {
      return await this.userService.findAllName();
  }
 
  @Get('total')
  @Auth("统计用户数")
  async getTotal() {
    return await this.userService.getTotal();
  }

  @Get(":id")
  @Auth("获取一个用户")
  async detail(@Param("id") id: number, @Req() req,@Query() withRelation:boolean = false) {
      return await this.userService.findOne(id,withRelation);
  }
  @Put(':id')
  @Auth("更新一个用户信息",['1','2','3'],"jwt")
  async update(@Param('id') id2: string, @Body() updateUserDto: UpdateUserDto,@Req() req) {
    let { id,role,username} = req.user
    const auth = await this.userService.user_auth_check(+id,+role,+id2)
    if(auth){
      let {id,username,papers,patents,competitions,projects,...updatePayload} = updateUserDto
      return await this.userService.update(+id,updatePayload)
    }
    throw new HttpException("权限不足",HttpStatus.FORBIDDEN)
  }

  @Post('relations/:id')
  @Auth("往一个用户的关系里加一个",['1',"2"],"jwt")
  async addRelation(@Param('id') id: string, @Body() req) {
    const relation = req.relation
    const relation_name = req.relation_name
    if(_.isEmpty(relation)) throw new HttpException("待删除的关系不能为空",HttpStatus.BAD_REQUEST)
    return await this.userService.deleteRelation(+id,relation_name,relation)
  }

  @Delete('relations/:id')
  @Auth("往一个用户的关系里删除一个",['1',"2"],"jwt")
  async deleteRelation(@Param('id') id: string, @Body() req) {
    const relation = req.relation
    const relation_name = req.relation_name
    if(_.isEmpty(relation)) throw new HttpException("添加的关系不能为空",HttpStatus.BAD_REQUEST)
    return await this.userService.addRelation(+id,relation_name,relation)
  }

  @Put('/pass/:id')
  @Auth("更新一个用户的密码",['1','2','3'],"jwt")
  async updatePassword(@Param('id') id2: string, @Body() updateUserDto: UpdateUserDto,@Req() req) {
    let { id,role,username} = req.user
    console.log(updateUserDto.password)
    // 只有超级用户可以改用户信息
    if(role != 1 && +id2 != +id) throw new HttpException("禁止修改他人密码",HttpStatus.BAD_REQUEST)
    if(_.isEmpty(updateUserDto.password)) throw new HttpException("密码不能为空",HttpStatus.BAD_REQUEST)
    const updatePayload = {
      password:updateUserDto.password
    }
    return await this.userService.update(+id,updatePayload)
  }

  @Delete(':id')
  @Auth("删除一个用户",['1'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id)
  }

  
  @Post()
  @Auth("创建一个用户信息")
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @Post("img")
  @UseInterceptors(FileInterceptor("file"))
  @Auth("上传图片(包括头像)",['1','2','3'],"jwt")
  async upload(@UploadedFile() file,@CUser() user:User) {
    return await this.userService.upload(file,user)
  }

  @Post("login")
  @Auth("登录",null,"local")
  async login(@Body() body: LoginDto,@CUser() user:User) {
      //sign的参数必须使用对象，否则无法设置过期时间
      return this.authService.login(user)
  }

}