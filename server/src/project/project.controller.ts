import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';

@ApiTags("project")
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Get()
  @Auth("查找所有项目")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.projectService.findAll(+pageSize, +page);
  }
  @Get(':id')
  @Auth("查找一个项目")
  async findOne(@Param('id') id: string) {
    return await this.projectService.findOne(+id);
  }

  @Put(':id')
  @Auth("更新一个项目",['1','2'],"jwt")
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @Auth("创建一个项目",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.projectService.remove(+id);
  }
}
