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
@ApiTags("管理员")
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

  @Get()
  @Auth("获取所有用户",null,"jwt")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    const users =  await this.userService.findAll(+pageSize, +page);
    return users
  }

  
  @Get(":id")
  @Auth("获取一个用户",null,"jwt")
  async detail(@Param("id") id: number, @Req() req) {
      if (!req) return "";
      return await this.userService.findOne(id);
  }

  
  @Get("relations/:id")
  @Auth("获取一个用户的所有项目")
  async findRelationsByUserId(@Param("id") id: number,@Query() relationDto: RelationDto) {
    let { relation, pageSize, page } = relationDto 
    return await this.userService.findRelationsByUserId(id,relation);
  }

  @Put(':id')
  @Auth("更新一个用户信息",['1','2','3'],"jwt")
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Req() req) {
    let { userId,role,username} = req.user
    const auth = await this.userService.user_auth_check(+userId,+role,+id)
    if(auth){
      return await this.userService.update(+id,updateUserDto)
    }
    throw new HttpException("权限不足",HttpStatus.FORBIDDEN)
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