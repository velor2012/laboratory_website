import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import * as moment from 'moment';
import { Project } from 'src/project/entities/project.entity';
@Entity('paper')
export class Paper {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true,description: '论文标题' })
  @Column()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true,description: '论文会议或期刊' })
  @Column()
  conf: string;

  @IsString({each:true})
  @IsNotEmpty()
  @ApiProperty({required: true,description: '论文作者' })
  @Column("simple-array")
  author: string[];

  
  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '论文链接' })
  @Column({nullable:true})
  link?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '论文发表时间',example:'2020' })
  @Column({nullable:true})
  year?: string;

  @ManyToMany(() => User, user => user.papers)
  users: User[];

  @ManyToMany(() => Project, project => project.papers)
  projects: Project[];

  @BeforeInsert()
  @BeforeUpdate()
  updateDates() {
    var m = moment(this.year);
    if(m.isValid()){
      this.year = m.format("YYYY")
    }else{
      this.year = null
      return false
    }
  }
}