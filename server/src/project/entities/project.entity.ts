import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,IsArray, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity('project')
export class Project {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '项目名称',example:"欧盟第七框架跨异构无线网络移动多媒体体验质量增强“This work was partly supported by the EU FP7 QUICK project under Grant Agreement No. PIRSES-GA-2013-612652”.2014年7月-2018年7月"  })
  @Column()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '项目简介',example:'这是简介'  })
  @Column()
  abstract?: string;

  @IsString({each:true})
  @IsOptional()
  @ApiProperty({required: false, description: '项目标签',type: [String] ,example:'欧盟第七框架' })
  @Column("simple-array")
  tag?: string[];

  
  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '项目地址',example:'https://xxxx.pdf' })
  @Column()
  link?: string;

  @ManyToMany(() => User, user => user.projects)
  @JoinTable()
  users: User[];
}