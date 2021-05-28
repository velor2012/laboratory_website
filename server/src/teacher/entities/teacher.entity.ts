import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  @ApiProperty({ required: true,description: '老师的名称',example:"肖晶" })
  name: string;

  @IsString()
  @IsOptional()
  @Column({nullable:true})
  @ApiProperty({ required: false,description: '老师的学位',example:"副教授" })
  degree?: string;

  
  @IsString()
  @IsOptional()
  @Column({nullable:true})
  @ApiProperty({ required: false,description: '老师的研究方向',example:"多媒体数据处理（压缩、修复、插帧、分割等），计算机视觉" })
  research_orientation?: string;

  
  @IsString()
  @IsOptional()
  @Column({nullable:true})
  @ApiProperty({ required: false,description: '老师的联系方式',example:"xxx@qq.com" })
  contact_info?: string;

  @OneToOne((type) => User, (user) => user.stu)
  user: User;
}