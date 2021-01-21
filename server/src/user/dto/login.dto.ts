import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
export default class LoginDto {
    @ApiProperty({required: true, description: '用户名', example: 'velor2012' })
    @Column({ length: 500 })
    username: string;
  
  
    @ApiProperty({required: true, description: '密码', example: 'ddd123' })
    @Column()
    password: string;
  }