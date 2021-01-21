import { Controller, Get, Post, Body, Put, Param, Delete, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import { UserService } from 'src/user/user.service';
import SearchDTO from 'src/lib/common_dto/search.dto';

@ApiTags("teacher")
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService,private readonly userService: UserService) {}

  @Post()
  @Auth("创建教师",['1'],"jwt")
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.teacherService.create(createTeacherDto);
  }

  @Get()
  @Auth("查找所有老师")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await  this.teacherService.findAll(+pageSize, +page);
  }

  @Get(':id')
  @Auth("查找一个老师")
  async findOne(@Param('id') id: string) {
    return await this.teacherService.findOne(+id);
  }

  @Put(':id')
  @Auth("修改老师的个人信息",['1','2','3'],"jwt")
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto,@Req() req) {
    let { userId,role,username} = req.user
    const auth = await this.userService.user_auth_check(+userId,+role,+id)
    if(auth){
      return await this.teacherService.update(+id, updateTeacherDto);
    }
    throw new HttpException("权限不足",HttpStatus.FORBIDDEN)

  }
  @Delete(':id')
  @Auth("删除一个老师",['1'],"jwt")
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
