import { Controller, Get, Post, Body, Put, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PaperService } from './paper.service';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';
import { RelationDto } from 'src/lib/common_dto/relation.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/user/entities/user.entity';

@ApiTags("papers")
@Controller('papers')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  @Post()
  @Auth("创建一个论文",['1','2'],"jwt")
  async create(@Body() createPaperDto: CreatePaperDto) {
    return await this.paperService.create(createPaperDto);
  }

  @Get("relations/:id")
  @Auth("获取论文相关的所有用户")
  async findRelationsByUserId(@Param("id") id: number,@Query() relationDto: RelationDto) {
    let { relation, pageSize, page } = relationDto 
    return await this.paperService.findRelationsByPaperId(id,relation,pageSize,page);
  }

  @Get()
  @Auth("查找所有论文")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.paperService.findAll(+pageSize, +page);
  }
  
  @Get("allName")
  @Auth("获取所有论文名")
  async findAllName() {
      return await this.paperService.findAllName();
  }

  @Get('total')
  @Auth("统计论文数")
  async getTotal() {
    return await this.paperService.getTotal();
  }

  @Get('year/:year')
  @Auth("查找某年份下的所有论文")
  async findByYear(@Param('year') year:string) {
    return await this.paperService.findByYearFront(+year);
  }

  @Get(':id')
  @Auth("查找一个论文")
  async findOne(@Param('id') id: string) {
    return await this.paperService.findOne(+id);
  }

  @Put(':id')
  @Auth("更新一个论文",['1','2'],"jwt")
  async update(@Param('id') id: string, @Body() updatePaperDto: UpdatePaperDto) {
    return await this.paperService.update(+id, updatePaperDto);
  }

  @Delete(':id')
  @Auth("删除一个论文",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.paperService.remove(+id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @Auth("上传论文pdf",['1','2'],"jwt")
  async upload(@UploadedFile() file) {
    return await this.paperService.upload(file)
  }
}
