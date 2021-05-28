import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

@Entity('researcher')
export class Researcher {
  
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '研究员级别', example: 'A' })
  @Column({nullable:true})
  degree?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '研究员研究方向', example: '计算机视觉' })
  @Column({nullable:true})
  research_orientation?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '研究员联系方式', example: 'xxx@qq.com' })
  @Column({nullable:true})
  contact_info?: string;

  
  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: '研究员头像路径' })
  @Column()
  avatar?: string;

  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({required: true, description: '研究员姓名', example: '嘀嘀嘀' })
  @Column()
  name: string;
}