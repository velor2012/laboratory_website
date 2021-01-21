import { Controller, Get, Post, Body, Put, Param, Delete, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { StuService } from './stu.service';
import { CreateStuDto } from './dto/create-stu.dto';
import { UpdateStuDto } from './dto/update-stu.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import { UserService } from 'src/user/user.service';
import SearchDTO from 'src/lib/common_dto/search.dto';

@ApiTags("stu")
@Controller('stu')
export class StuController {
  constructor(
    private readonly stuService: StuService,
    private readonly userService: UserService) {}

  @Post()
  @Auth("创建一个学生用户",['1'],"jwt")
  async create(@Body() createStuDto: CreateStuDto) {
    return await this.stuService.create(createStuDto);
  }

  @Get()
  @Auth("查找所有学生")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await  this.stuService.findAll(+pageSize, +page);
  }

  @Get(':id')
  @Auth("查找一个学生")
  async findOne(@Param('id') id: string) {
    return await this.stuService.findOne(+id);
  }

  @Put(':id')
  @Auth("修改学生信息",['1','2','3'],"jwt")
  async update(@Param('id') id: string, @Body() updateStuDto: UpdateStuDto,@Req() req) {
    let { userId,role,username} = req.user
    const auth = await this.userService.user_auth_check(+userId,+role,+id)
    if(auth){
      return await this.stuService.update(+id, updateStuDto);
    }
    throw new HttpException("权限不足",HttpStatus.FORBIDDEN)
  }

  @Delete(':id')
  @Auth("删除一个学生信息",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.stuService.remove(+id);
  }
}
