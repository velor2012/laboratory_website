import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

@Entity('stu')
export class Stu {

  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true,description: '学生名称' })
  @Column()
  stu_name: string;

  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true,description: '学生入学年份',example:2016 })
  @Column()
  enroll_time: number;

  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true,description: '学生毕业状态',enum: ['在读','毕业'],example:'在读'  })
  @Column()
  state: string;

  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true,description: '学生学位',enum:['学硕','专硕','博士'],example:'学硕'  })
  @Column()
  degree: string;

  
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false,description: '学生研究方向',example:'机器学习' })
  @Column()
  research_or?: string;
  
  @BeforeInsert()
  @BeforeUpdate()
  updateDates() {
    this.enroll_time =Number(this.enroll_time)
  }
}