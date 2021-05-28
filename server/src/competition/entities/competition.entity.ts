import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity('competition')
export class Competition {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @ApiProperty({required: true,description: '比赛名' })
  @Column()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '比赛的简介' })
  @Column({nullable:true})
  abstract?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '论文的相关链接' })
  @Column({nullable:true})
  link?: string;

  @IsString({each:true})
  @IsOptional()
  @ApiProperty({required: false,type: [String],description: '比赛的标签' })
  @Column({type:"simple-array",nullable:true})
  tag?: string[];

  @IsString({each:true})
  @IsOptional()
  @ApiProperty({required: false,description: '相关人员',example:['肖晶','胡瑞敏'],type:[String] })
  @Column({type:"simple-array",nullable:true})
  participants?: string[];

  @ManyToMany(() => User, user => user.competitions)
  users: User[];
}