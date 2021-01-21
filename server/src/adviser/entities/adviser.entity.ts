import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('adviser')
export class Adviser {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({required: false,description: '顾问名' })
  @Column()
  advisers_na: string;

  @ApiProperty({required: false,description: '顾问的级别' })
  @Column()
  degree: string;

  @ApiProperty({required: false,description: '顾问的研究方向' })
  @Column()
  research_or: string;

  @ApiProperty({required: false,description: '顾问的联系方式' })
  @Column()
  contact_inf: string;

  @ApiProperty({required: false,description: '顾问的头像路径' })
  @Column()
  imgUrl: string;
}