import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePatentDto } from './dto/update-patent.dto';
import { Patent } from './entities/patent.entity';
import { CreatePatentDto } from './dto/create-patent.dto';

@Injectable()
export class PatentService {
  constructor(
    @InjectRepository(Patent)
    private patentsRepository: Repository<Patent>,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.patentsRepository.find({skip:pageSize * (page - 1),take:pageSize});
  }

  async findOne(id: number) {
    return await this.patentsRepository.findOne(id);
  }

  async remove(id: number) {
    await this.patentsRepository.delete(id);
  }
  async update(id: number, updatePatentDto: UpdatePatentDto) {
    return await this.patentsRepository.update(id,updatePatentDto);
  }
  async create(createPatentDto: CreatePatentDto) {
    const userproject = this.patentsRepository.create(createPatentDto);
    return await this.patentsRepository.save(userproject);
  }
}