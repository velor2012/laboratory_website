import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column()
  role: number;

  @Column()
  password: string;

  @Column()
  // timestamp
  last_time: string;

  @Column()
  relation: number;

  @Column()
  state: number; 
}