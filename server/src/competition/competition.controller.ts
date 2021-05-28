import { Controller, Get, Post, Body, Put, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RelationDto } from 'src/lib/common_dto/relation.dto';

@ApiTags("competitions")
@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Post()
  @Auth("创建一个竞赛")
  async create(@Body() createCompetitionDto: CreateCompetitionDto) {
    return await this.competitionService.create(createCompetitionDto);
  }

  @Get()
  @Auth("查找所有竞赛")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.competitionService.findAll(+pageSize, +page);
  }

  @Get('total')
  @Auth("统计竞赛数")
  async getTotal() {
    return await this.competitionService.getTotal();
  }

  @Get(':id')
  @Auth("查找一个竞赛")
  async findOne(@Param('id') id: string) {
    return await this.competitionService.findOne(+id);
  }

  @Put(':id')
  @Auth("更新一个竞赛",['1','2'],"jwt")
  async update(@Param('id') id: string, @Body() updateCompetitionDto: UpdateCompetitionDto) {
    return await this.competitionService.update(+id, updateCompetitionDto);
  }

  @Delete(':id')
  @Auth("创建一个竞赛",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.competitionService.remove(+id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @Auth("上传文件",['1','2'],"jwt")
  async upload(@UploadedFile() file) {
    return await this.competitionService.upload(file)
  }

  @Get("relations/:id")
  @Auth("获取竞赛相关的所有用户")
  async findRelationsByUserId(@Param("id") id: number,@Query() relationDto: RelationDto) {
    let { relation, pageSize, page } = relationDto 
    return await this.competitionService.findRelationsByPaperId(id,relation,pageSize,page);
  }
}
