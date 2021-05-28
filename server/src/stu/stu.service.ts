import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStuDto } from './dto/update-stu.dto';
import { Stu } from './entities/stu.entity';
import { CreateStuDto } from './dto/create-stu.dto';

@Injectable()
export class StuService {
  constructor(
    @InjectRepository(Stu)
    private stusRepository: Repository<Stu>,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.stusRepository.find({skip:pageSize * (page - 1),take:pageSize,relations:['user']});
  }

  async findState(state:string, pageSize:number, page:number) {
    // state = state ==
    return await this.stusRepository.find({skip:pageSize * (page - 1),take:pageSize,where:[{state:state}],relations:['user']});
  }

  async findOne(id: number) {
    return await this.stusRepository.findOne(id,{relations:['user']});
  }

  async remove(id: number) {
    await this.stusRepository.delete(id);
  }
  async update(id: number, updateStuDto: UpdateStuDto) {
    return await this.stusRepository.update(id,updateStuDto);
  }
  async create(createStuDto: CreateStuDto) {
    const userproject = this.stusRepository.create(createStuDto);
    return await this.stusRepository.save(userproject);
  }
}