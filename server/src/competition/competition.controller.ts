import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';

@Controller('competition')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Post()
  @Auth("创建一个竞赛",['1','2'],"jwt")
  async create(@Body() createCompetitionDto: CreateCompetitionDto) {
    return await this.competitionService.create(createCompetitionDto);
  }

  @Get()
  @Auth("查找所有竞赛")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.competitionService.findAll(+pageSize, +page);
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
  @Auth("删除一个竞赛",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.competitionService.remove(+id);
  }
}
