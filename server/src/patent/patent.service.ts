import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { UpdatePatentDto } from './dto/update-patent.dto';
import { Patent } from './entities/patent.entity';
import { CreatePatentDto } from './dto/create-patent.dto';
import { Paper } from 'src/paper/entities/paper.entity';
import { Inject } from '@nestjs/common';
import { ImgUploadService } from 'src/lib/upload/upload.sevice';
@Injectable()
export class PatentService {
  constructor(
    @InjectRepository(Patent)
    private patentsRepository: Repository<Patent>,
    @Inject('ImgUploadService') private readonly ImgUploadService: ImgUploadService,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.patentsRepository.find({skip:pageSize * (page - 1),take:pageSize,relations:['users'],order:{authorized_time:"DESC"}});
  }

  async getTotal() {
    return await this.patentsRepository.count()
  }

  async findOne(id: number) {
    return await this.patentsRepository.findOne(id);
  }

  async remove(id: number) {
    await this.patentsRepository.delete(id);
  }
  
  //相关说明见paper.seervice.ts
  async update(id: number, updatePatentDto: UpdatePatentDto) {
    let {users,oldusers,...updateDto1} = updatePatentDto
    let patent = undefined
    let patent2 =undefined
    let result1 = undefined
    const a = await getManager().transaction(async TransactionManager=>{
      // patent = await  this.PatentsRepository.findOne(20150006)
      patent = TransactionManager.create(Patent,updateDto1)
      result1 = await TransactionManager.update(Patent,id,updateDto1);

      patent2 = await TransactionManager.createQueryBuilder().relation(Patent,'users').of(patent).addAndRemove(
        users,oldusers)
    }).catch(e=>{
      throw new HttpException('修改失败',HttpStatus.BAD_REQUEST)
    })
    return {result1,patent2}
  }
  async create(createPatentDto: CreatePatentDto) {
    const userpatent = this.patentsRepository.create(createPatentDto);
    return await this.patentsRepository.save(userpatent);
  }

  async findRelationsByPaperId(id: number,relation: string,pageSize:number,page:number) {
    return await this.patentsRepository.createQueryBuilder()
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