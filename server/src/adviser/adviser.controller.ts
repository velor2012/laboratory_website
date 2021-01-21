import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';

@ApiTags("adviser")
@Controller('adviser')
export class AdviserController {
  constructor(private readonly adviserService: AdviserService) {}

  @Post()
  @Auth("创建一个顾问",['1','2'],"jwt")
  async create(@Body() createAdviserDto: CreateAdviserDto) {
    return await this.adviserService.create(createAdviserDto);
  }

  @Get()
  @Auth("查找所有顾问")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.adviserService.findAll(+pageSize, +page);
  }

  @Get(':id')
  @Auth("查找一个顾问")
  async findOne(@Param('id') id: string) {
    return await this.adviserService.findOne(+id);
  }

  @Put(':id')
  @Auth("更新一个顾问",['1','2'],"jwt")
  async update(@Param('id') id: string, @Body() updateAdviserDto: UpdateAdviserDto) {
    return await this.adviserService.update(+id, updateAdviserDto);
  }

  @Delete(':id')
  @Auth("删除一个顾问",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.adviserService.remove(+id);
  }
}
