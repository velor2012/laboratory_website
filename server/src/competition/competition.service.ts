import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { Competition } from './entities/competition.entity';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { Paper } from 'src/paper/entities/paper.entity';
import { Inject } from '@nestjs/common';
import { ImgUploadService } from 'src/lib/upload/upload.sevice';
@Injectable()
export class CompetitionService {
  constructor(
    @InjectRepository(Competition)
    private competitionsRepository: Repository<Competition>,
    @Inject('ImgUploadService') private readonly ImgUploadService: ImgUploadService,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.competitionsRepository.find({skip:pageSize * (page - 1),take:pageSize,relations:['users']});
  }

  async findOne(id: number) {
    return await this.competitionsRepository.findOne(id);
  }

  async getTotal() {
    return await this.competitionsRepository.count()
  }

  async remove(id: number) {
    await this.competitionsRepository.delete(id);
  }
  
  //相关说明见paper.seervice.ts
  async update(id: number, updateCompetitionDto: UpdateCompetitionDto) {
    let {users,oldusers,...updateDto1} = updateCompetitionDto
    let competition = undefined
    let competition2 =undefined
    let result1 = undefined
    const a = await getManager().transaction(async TransactionManager=>{
      // competition = await  this.CompetitionsRepository.findOne(20150006)
      competition = TransactionManager.create(Competition,updateDto1)
      result1 = await TransactionManager.update(Competition,id,updateDto1);

      competition2 = await TransactionManager.createQueryBuilder().relation(Competition,'users').of(competition).addAndRemove(
        users,oldusers)
    }).catch(e=>{
      throw new HttpException('修改失败',HttpStatus.BAD_REQUEST)
    })
    return {result1,competition2}
  }
  async create(createCompetitionDto: CreateCompetitionDto) {
    const usercompetition = this.competitionsRepository.create(createCompetitionDto);
    return await this.competitionsRepository.save(usercompetition);
  }

  async findRelationsByPaperId(id: number,relation: string,pageSize:number,page:number) {
    return await this.competitionsRepository.createQueryBuilder()
    .relation(Paper, relation)
    .of(id) // 也可以使用post id
    .select(["id", "username"])
    .skip(pageSize * (page - 1))
    .take(pageSize)
    .getMany();
  }
  async upload(file:any){
    let res = await this.ImgUploadService.upload(file);
    return res
  }

}