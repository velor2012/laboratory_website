import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@Entity('competition')
export class Competition {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({required: true,description: '比赛名' })
  @Column()
  title: string;

  @ApiProperty({required: false,description: '比赛的简介' })
  @Column()
  abstract?: string;

  @ApiProperty({required: false,description: '论文的相关链接' })
  @Column()
  link?: string;

  @ApiProperty({required: false,description: '比赛的标签' })
  @Column("simple-array")
  tag?: string[];

  @ManyToMany(() => User, user => user.competitions)
  @JoinTable()
  users: User[];
}