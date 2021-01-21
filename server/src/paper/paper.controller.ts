import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PaperService } from './paper.service';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';

@ApiTags("paper")
@Controller('paper')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  @Post()
  @Auth("创建一个论文",['1','2'],"jwt")
  async create(@Body() createPaperDto: CreatePaperDto) {
    return await this.paperService.create(createPaperDto);
  }

  @Get()
  @Auth("查找所有论文")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.paperService.findAll(+pageSize, +page);
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
}
