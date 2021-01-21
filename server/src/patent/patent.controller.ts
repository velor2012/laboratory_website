import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PatentService } from './patent.service';
import { CreatePatentDto } from './dto/create-patent.dto';
import { UpdatePatentDto } from './dto/update-patent.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';

@ApiTags("patent")
@Controller('patent')
export class PatentController {
  constructor(private readonly patentService: PatentService) {}

  @Post()
  @Auth("创建一个专利",['1','2'],"jwt")
  async create(@Body() createPatentDto: CreatePatentDto) {
    return await this.patentService.create(createPatentDto);
  }

  @Get()
  @Auth("查找所有专利")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.patentService.findAll(+pageSize, +page);
  }

  @Get(':id')
  @Auth("查找一个专利")
  async findOne(@Param('id') id: string) {
    return await this.patentService.findOne(+id);
  }

  @Put(':id')
  @Auth("更新一个专利",['1','2'],"jwt")
  async update(@Param('id') id: string, @Body() updatePatentDto: UpdatePatentDto) {
    return await this.patentService.update(+id, updatePatentDto);
  }

  @Delete(':id')
  @Auth("删除一个专利",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.patentService.remove(+id);
  }
}
