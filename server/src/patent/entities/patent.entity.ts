import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Stu } from 'src/stu/entities/stu.entity';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity('patent')
export class Patent {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '发表专利的人的名字',example:'嘀嘀嘀' })
  @Column()
  publish_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '发表专利的名称',example:'城市交通监控视频全局编码方法与系统' })
  @Column()
  patent_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true,enum:['发明'], description: '所属类型',example:'发明' })
  @Column()
  application_class: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '专利生效时间',example:'2020-01-01' })
  @Column()
  authorized_time?: string;

  @IsString({each:true})
  @IsOptional()
  @ApiProperty({required: false,description: '相关人员',example:['肖晶','胡瑞敏'],type:[String] })
  @Column({type:"simple-array",nullable:true})
  invent_name?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '专利id',example:'201810710560.4' })
  @Column({nullable:true})
  authorized_id?: string

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '不知道是啥',example:'' })
  @Column({nullable:true})
  institution?:string

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '专利地址',example:'https://xxxx.xx' })
  @Column({nullable:true})
  link?: string;

  @ManyToMany(() => User, user => user.patents)
  users: User[];

  @BeforeInsert()
  @BeforeUpdate()
  updateDates() {
    var m = moment(this.authorized_time);
    if(m.isValid()){
      this.authorized_time = m.format("YYYY-MM-DD")

    }else{
      this.authorized_time = null
      return false
    }
  }
}