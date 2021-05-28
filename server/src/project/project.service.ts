import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Paper } from 'src/paper/entities/paper.entity';
import { Inject } from '@nestjs/common';
import { ImgUploadService } from 'src/lib/upload/upload.sevice';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @Inject('ImgUploadService') private readonly ImgUploadService: ImgUploadService,
  ) {}

  async findAll(pageSize:number, page:number) {
    return await this.projectsRepository.find({skip:pageSize * (page - 1),take:pageSize,relations:['users','papers']});
  }

  async getTotal() {
    return await this.projectsRepository.count()
  }

  async findOne(id: number) {
    return await this.projectsRepository.findOne(id);
  }

  async remove(id: number) {
    await this.projectsRepository.delete(id);
  }
  
  //相关说明见paper.seervice.ts
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    let {users,oldusers,papers,oldpapers,...updateDto1} = updateProjectDto
    let project = undefined
    let project2 =undefined
    let project3 =undefined
    let result1 = undefined
    const a = await getManager().transaction(async TransactionManager=>{
      // project = await  this.ProjectsRepository.findOne(20150006)
      project = TransactionManager.create(Project,updateDto1)
      result1 = await TransactionManager.update(Project,id,updateDto1);

      project2 = await TransactionManager.createQueryBuilder().relation(Project,'users').of(project).addAndRemove(
        users,oldusers)
      project3 = await TransactionManager.createQueryBuilder().relation(Project,'papers').of(project).addAndRemove(
        papers,oldpapers)
    }).catch(e=>{
      throw new HttpException('修改失败',HttpStatus.BAD_REQUEST)
    })
    return {result1,project2}
  }
  async create(createProjectDto: CreateProjectDto) {
    const userproject = this.projectsRepository.create(createProjectDto);
    return await this.projectsRepository.save(userproject);
  }

  async findRelationsByPaperId(id: number,relation: string,pageSize:number,page:number) {
    return await this.projectsRepository.createQueryBuilder()
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