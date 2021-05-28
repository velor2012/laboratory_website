import { Controller, Get, Post, Body, Put, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import SearchDTO from 'src/lib/common_dto/search.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RelationDto } from 'src/lib/common_dto/relation.dto';

@ApiTags("projects")
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Auth("创建一个项目")
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Get()
  @Auth("查找所有项目")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.projectService.findAll(+pageSize, +page);
  }

  @Get('total')
  @Auth("统计项目数")
  async getTotal() {
    return await this.projectService.getTotal();
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

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @Auth("上传文件",['1','2'],"jwt")
  async upload(@UploadedFile() file) {
    return await this.projectService.upload(file)
  }

  @Get("relations/:id")
  @Auth("获取项目相关的所有用户")
  async findRelationsByUserId(@Param("id") id: number,@Query() relationDto: RelationDto) {
    let { relation, pageSize, page } = relationDto 
    return await this.projectService.findRelationsByPaperId(id,relation,pageSize,page);
  }
}
