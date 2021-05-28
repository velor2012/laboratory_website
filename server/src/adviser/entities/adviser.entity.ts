import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity('adviser')
export class Adviser {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({required: false,description: '顾问名' })
  @Column()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '顾问的级别' })
  @Column({nullable:true})
  degree?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '顾问的研究方向' })
  @Column({nullable:true})
  research_orientation?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,description: '顾问的联系方式' })
  @Column({nullable:true})
  contact_info?: string;
  
  @OneToOne((type) => User, (user) => user.stu)
  user: User;
}