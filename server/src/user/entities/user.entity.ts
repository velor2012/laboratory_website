import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString,IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Project } from 'src/project/entities/project.entity';
import { Patent } from 'src/patent/entities/patent.entity';
import { Competition } from 'src/competition/entities/competition.entity';
import { Paper } from 'src/paper/entities/paper.entity';
@Entity('user')
export class User {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({required: true, description: '用户名', example: 'velor2012' })
  @IsString()
  @IsNotEmpty()
  @Column({ length: 500 })
  username: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, enum: [1, 2, 3] , description: '权限角色,1表示超级用户,2可以发论文，2为普通用户', example: 3 })
  @Column()
  role: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '密码', example: 'ddd123' })
  @Column({select:false})
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '上次登录时间,YYYY-MM-DD', example: '2019-10-01' })
  @Column()
  // timestamp
  last_time: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({required: true,enum: [1, 2, 3,4], description: '实际生活中的角色，1表示老师, 2 顾问, 3 研究员,4 学生', example: 4 })
  @Column()
  relation: number;
  
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: true,description: '状态', example: 0 })
  @Column()
  state?: number; 

  @ManyToMany(() => Project, project => project.users)
  @JoinTable()
  projects: Project[];

  @ManyToMany(() => Patent, patent => patent.users)
  @JoinTable()
  patents: Patent[];

  @ManyToMany(() => Paper, paper => paper.users)
  @JoinTable()
  papers: Paper[];

  @ManyToMany(() => Competition, competition => competition.users)
  @JoinTable()
  competitions: Competition[];

  @BeforeInsert()
  @BeforeUpdate()
  updateDates() {
    var m = moment(this.last_time);
    if(m.isValid()){
      this.last_time = m.format("YYYY-MM-DD")
    }else{
      this.last_time = null
      return false
    }
  }
}