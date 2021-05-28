import { Controller, Get, Post, Body, Put, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PatentService } from './patent.service';
import { CreatePatentDto } from './dto/create-patent.dto';
import { UpdatePatentDto } from './dto/update-patent.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RelationDto } from 'src/lib/common_dto/relation.dto';

@ApiTags("patents")
@Controller('patents')
export class PatentController {
  constructor(private readonly patentService: PatentService) {}

  @Post()
  @Auth("创建一个专利")
  async create(@Body() createPatentDto: CreatePatentDto) {
    return await this.patentService.create(createPatentDto);
  }

  @Get()
  @Auth("查找所有专利")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.patentService.findAll(+pageSize, +page);
  }

  @Get('total')
  @Auth("统计专利数")
  async getTotal() {
    return await this.patentService.getTotal();
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
  @Auth("创建一个专利",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.patentService.remove(+id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @Auth("上传文件",['1','2'],"jwt")
  async upload(@UploadedFile() file) {
    return await this.patentService.upload(file)
  }

  @Get("relations/:id")
  @Auth("获取专利相关的所有用户")
  async findRelationsByUserId(@Param("id") id: number,@Query() relationDto: RelationDto) {
    let { relation, pageSize, page } = relationDto 
    return await this.patentService.findRelationsByPaperId(id,relation,pageSize,page);
  }
}
