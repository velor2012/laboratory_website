import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.projectsRepository.find({skip:pageSize * (page - 1),take:pageSize});
  }

  async findOne(id: number) {
    return await this.projectsRepository.findOne(id);
  }

  async remove(id: number) {
    await this.projectsRepository.delete(id);
  }
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.projectsRepository.update(id,updateProjectDto);
  }
  async create(createProjectDto: CreateProjectDto) {
    const userproject = this.projectsRepository.create(createProjectDto);
    return await this.projectsRepository.save(userproject);
  }
}