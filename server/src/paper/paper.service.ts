import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Transaction, TransactionManager, EntityManager } from 'typeorm';
import { UpdatePaperDto } from './dto/update-Paper.dto';
import { Paper } from 'src/paper/entities/paper.entity';
import { CreatePaperDto } from './dto/create-paper.dto';
import { ImgUploadService } from 'src/lib/upload/upload.sevice';
@Injectable()
export class PaperService {
  constructor(
    @InjectRepository(Paper)
    private PapersRepository: Repository<Paper>,
    @Inject('ImgUploadService') private readonly ImgUploadService: ImgUploadService,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.PapersRepository.find({skip:pageSize * (page - 1),take:pageSize,relations:['users','projects'],order:{'year':"DESC"}});
  }

  async findAllName() {
    return await this.PapersRepository.find({select:['title','id']});
  }

  async getTotal() {
    return await this.PapersRepository.count()
  }

  async findByYearFront(year){
    return await this.PapersRepository.find({year:year});
  }

  async findOne(id: number) {
    return await this.PapersRepository.findOne(id);
  }

  async remove(id: number) {
    await this.PapersRepository.delete(id);
  }
  async update(id: number, updatePaperDto: UpdatePaperDto) {
    let {users,oldusers,...updateDto1} = updatePaperDto
    let paper = undefined
    let paper2 =undefined
    let result1 = undefined
    //先更新除了相关用户之外的其他属性，即35，36行，38行更新相关用户
    const a = await getManager().transaction(async TransactionManager=>{
      // paper = await  this.PapersRepository.findOne(20150006)
      paper = TransactionManager.create(Paper,updateDto1)
      result1 = await TransactionManager.update(Paper,id,updateDto1);

      paper2 = await TransactionManager.createQueryBuilder().relation(Paper,'users').of(paper).addAndRemove(
        users,oldusers)
    }).catch(e=>{
      throw new HttpException('修改失败',HttpStatus.BAD_REQUEST)
    })
    return {result1,paper2}
  }
  async create(createPaperDto: CreatePaperDto) {
    const userproject = this.PapersRepository.create(createPaperDto);
    return await this.PapersRepository.save(userproject);
  }

  async findRelationsByPaperId(id: number,relation: string,pageSize:number,page:number) {
    return await this.PapersRepository.createQueryBuilder()
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