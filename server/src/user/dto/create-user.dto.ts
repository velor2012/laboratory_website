import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { Stu } from "src/stu/entities/stu.entity";
import { Adviser } from "src/adviser/entities/adviser.entity";
import { Researcher } from "src/researcher/entities/researcher.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";

export class CreateUserDto extends User{
    @ApiProperty({required: false, description: '学生信息', example: {stu_name:"ddd",enroll_time:2016,
    state:"在读",degree:"学硕"} })
    stu?: Stu;
    @ApiProperty({required: false, description: '研究员信息', example: 'velor2012' })
    adviser?: Adviser;
    @ApiProperty({required: false, description: '研究员信息', example: 'velor2012' })
    researcher?: Researcher;
    @ApiProperty({required: false, description: '老师信息', example: 'velor2012' })
    teacher?: Teacher;
}
