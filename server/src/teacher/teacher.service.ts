import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const userproject = this.teachersRepository.create(createTeacherDto);
    return await this.teachersRepository.save(userproject);
  }
  async findAll(pageSize:number, page:number) {
    return await this.teachersRepository.find({skip:pageSize * (page - 1),take:pageSize});
  }

  async findOne(id: number) {
    return await this.teachersRepository.findOne(id);
  }

  async remove(id: number) {
    await this.teachersRepository.delete(id);
  }
  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return await this.teachersRepository.update(id,updateTeacherDto);
  }
}