import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { Competition } from './entities/competition.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompetitionService {
  constructor(
    @InjectRepository(Competition)
    private competitionsRepository: Repository<Competition>,
  ) {}
  async create(createCompetitionDto: CreateCompetitionDto) {
    const userproject = this.competitionsRepository.create(createCompetitionDto);
    return await this.competitionsRepository.save(userproject);
  }
  async findAll(pageSize:number, page:number) {
    return await this.competitionsRepository.find({skip:pageSize * (page - 1),take:pageSize});
  }

  async findOne(id: number) {
    return await this.competitionsRepository.findOne(id);
  }

  async remove(id: number) {
    await this.competitionsRepository.delete(id);
  }
  async update(id: number, updateCompetitionDto: UpdateCompetitionDto) {
    return await this.competitionsRepository.update(id,updateCompetitionDto);
  }
}
