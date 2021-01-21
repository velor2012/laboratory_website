import { PartialType } from '@nestjs/mapped-types';
import { Paper } from 'src/paper/entities/paper.entity';
import { Patent } from 'src/patent/entities/patent.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    // @ApiProperty({required: false, description: '用户名', example: 'velor2012' })
    // username?: string;
    // @ApiProperty({required: false,  enum: [1, 2, 3] , description: '权限角色,1表示超级用户,2可以发论文，3为普通用户', example: 3 })
    // role?: number;
    // @ApiProperty({required: false, description: '密码', example: 'ddd123' })
    // password?: string;

    // // timestamp
    // @ApiProperty({required: false, description: '上次登录时间,YYYY-MM-DD', example: '2019-10-01' })
    // last_time?: string;
    // @ApiProperty({required: false,enum: [1, 2, 3,4], description: '实际生活中的角色，1表示老师, 2 顾问, 3 研究员,4 学生', example: 4 })
    // relation?: number;
    // @ApiProperty({required: false, description: '状态', example: 0 })
    // state?: number; 
}
