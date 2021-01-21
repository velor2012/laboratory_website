import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePaperDto } from './dto/update-Paper.dto';
import { Paper } from './entities/Paper.entity';
import { CreatePaperDto } from './dto/create-paper.dto';

@Injectable()
export class PaperService {
  constructor(
    @InjectRepository(Paper)
    private PapersRepository: Repository<Paper>,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.PapersRepository.find({skip:pageSize * (page - 1),take:pageSize});
  }

  async findOne(id: number) {
    return await this.PapersRepository.findOne(id);
  }

  async remove(id: number) {
    await this.PapersRepository.delete(id);
  }
  async update(id: number, updatePaperDto: UpdatePaperDto) {
    return await this.PapersRepository.update(id,updatePaperDto);
  }
  async create(createPaperDto: CreatePaperDto) {
    const userproject = this.PapersRepository.create(createPaperDto);
    return await this.PapersRepository.save(userproject);
  }
}