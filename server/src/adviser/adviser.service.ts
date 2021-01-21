import { Injectable } from '@nestjs/common';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';
import { Adviser } from './entities/adviser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdviserService {
  constructor(
    @InjectRepository(Adviser)
    private advisersRepository: Repository<Adviser>,
  ) {}
  async create(createAdviserDto: CreateAdviserDto) {
    const userproject = this.advisersRepository.create(createAdviserDto);
    return await this.advisersRepository.save(userproject);
  }
  async findAll(pageSize:number, page:number) {
    return await this.advisersRepository.find({skip:pageSize * (page - 1),take:pageSize});
  }

  async findOne(id: number) {
    return await this.advisersRepository.findOne(id);
  }

  async remove(id: number) {
    await this.advisersRepository.delete(id);
  }
  async update(id: number, updateAdviserDto: UpdateAdviserDto) {
    return await this.advisersRepository.update(id,updateAdviserDto);
  }
}
