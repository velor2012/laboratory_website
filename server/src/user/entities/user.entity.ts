import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString,IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Project } from 'src/project/entities/project.entity';
import { Patent } from 'src/patent/entities/patent.entity';
import { Competition } from 'src/competition/entities/competition.entity';
import { Paper } from 'src/paper/entities/paper.entity';
import * as bcrypt from 'bcrypt'
import * as _ from 'lodash'
import { Stu } from 'src/stu/entities/stu.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Adviser } from 'src/adviser/entities/adviser.entity';
import { Researcher } from 'src/researcher/entities/researcher.entity';
@Entity('user')
export class User {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({required: false, description: '头像', example: 'https://xxx.jpg' })
  @IsString()
  @IsOptional()
  @Column({nullable:true})
  avatar?: string;

  @ApiProperty({required: true, description: '用户名', example: 'velor2012' })
  @IsString()
  @IsNotEmpty()
  @Column({ length: 20 })
  username: string;

  @ApiProperty({required: true, description: '真实姓名', example: '陈文益' })
  @IsString()
  @IsNotEmpty()
  @Column({ length: 10 })
  realname: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, enum: [1, 2, 3] , description: '权限角色,1表示超级用户,2可以发论文，3为普通用户', example: 3 })
  @Column()
  role: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '密码', example: 'ddd123' })
  @Column({select:false})
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '上次登录时间,YYYY-MM-DD', example: '2019-10-01' })
  @Column({nullable:true})
  // timestamp
  last_time?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({required: true,enum: [1, 2, 3,4], description: '实际生活中的角色，1表示老师, 2 顾问, 3 研究员,4 学生', example: 4 })
  @Column()
  relation: number;
  
  @OneToOne((type) => Stu, (stu) => stu.user,{cascade:true})
  @IsOptional()
  @ApiProperty({ required: false,description: '当前用户为学生时，对应的学生身份信息' })
  @JoinColumn()
  stu?: Stu;
  @OneToOne((type) => Teacher, (teacher) => teacher.user,{cascade:true})
  @IsOptional()
  @ApiProperty({ required: false,description: '当前用户为教师时，对应的教师身份信息'})
  @JoinColumn()
  teacher?: Teacher;
  @OneToOne((type) => Adviser, (adviser) => adviser.user,{cascade:true})
  @IsOptional()
  @ApiProperty({ required: false,description: '当前用户为顾问时，对应的顾问身份信息'})
  @JoinColumn()
  adviser?: Adviser;
  @OneToOne((type) => Researcher, (researcher) => researcher.user,{cascade:true})
  @IsOptional()
  @ApiProperty({ required: false,description: '当前用户为researcher时，对应的researcher身份信息'})
  @JoinColumn()
  researcher?: Researcher;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: true,description: '状态', example: 0 })
  @Column({nullable:true})
  state?: number; 

  @ManyToMany(() => Project, project => project.users,{
    cascade: true
  })
  @JoinTable()
  projects: Project[];

  @ManyToMany(() => Patent, patent => patent.users,{
    cascade: true
  })
  @JoinTable()
  patents: Patent[];

  @ManyToMany(() => Paper, paper => paper.users,{
    cascade: true
  })
  @JoinTable()
  papers: Paper[];

  @ManyToMany(() => Competition, competition => competition.users,{
    cascade: true
  })
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

  @BeforeInsert()
  @BeforeUpdate()
  updatePasswd() {
    if(!_.isEmpty(this.password)) this.password = bcrypt.hashSync(this.password ,10)
  }
}