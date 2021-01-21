import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { Researcher } from './entities/researcher.entity';
import { CreateResearcherDto } from './dto/create-researcher.dto';

@Injectable()
export class ResearcherService {
  constructor(
    @InjectRepository(Researcher)
    private researchersRepository: Repository<Researcher>,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.researchersRepository.find({skip:pageSize * (page - 1),take:pageSize});
  }

  async findOne(id: number) {
    return await this.researchersRepository.findOne(id);
  }

  async remove(id: number) {
    await this.researchersRepository.delete(id);
  }
  async update(id: number, updateResearcherDto: UpdateResearcherDto) {
    return await this.researchersRepository.update(id,updateResearcherDto);
  }
  async create(createResearcherDto: CreateResearcherDto) {
    const userproject = this.researchersRepository.create(createResearcherDto);
    return await this.researchersRepository.save(userproject);
  }
}