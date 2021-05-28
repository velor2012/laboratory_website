import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,IsArray, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import * as moment from 'moment';
import { Paper } from 'src/paper/entities/paper.entity';

@Entity('project')
export class Project {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '基金/大项目中文名称',example:"欧盟第七框架"  })
  @Column()
  fund_name_cn: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty({required: true, description: '基金/大项目英文名称',example:"EU FP7"  })
  @Column()
  fund_name_en?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '项目名称',example:"跨异构无线网络移动多媒体体验质量增强"  })
  @Column()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '开始时间',example:"2019-06"  })
  @Column()
  start_date: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: true, description: '结束时间',example:"2020-07"  })
  @Column()
  end_date?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '项目简介',example:'这是简介'  })
  @Column({nullable:true})
  abstract?: string;

  @IsString({each:true})
  @IsOptional()
  @ApiProperty({required: false, description: '项目标签',type: [String] ,example:'欧盟第七框架' })
  @Column({type:"simple-array",nullable:true})
  tags?: string[];

  
  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '项目地址',example:'https://xxxx.pdf' })
  @Column({nullable:true})
  link?: string;

  @IsString({each:true})
  @IsOptional()
  @ApiProperty({required: false,description: '相关人员',example:['肖晶','胡瑞敏'],type:[String] })
  @Column({type:"simple-array",nullable:true})
  participants?: string[];

  @ManyToMany(() => User, user => user.projects)
  users: User[];

  @ManyToMany(() => Paper, paper => paper.projects,{
    cascade: true
  })
  @JoinTable()
  papers: Paper[];

  @BeforeInsert()
  @BeforeUpdate()
  updateDates() {
    var m = moment(this.start_date);
    if(m.isValid()){
      this.start_date = m.format("YYYY-MM")
    }else{
      this.start_date = null
      return false
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  updateDates2() {
    var m = moment(this.end_date);
    if(m.isValid()){
      this.end_date = m.format("YYYY-MM")
    }else{
      this.end_date = null
      return false
    }
  }
}