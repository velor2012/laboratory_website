import { PartialType } from '@nestjs/mapped-types';
import { Paper } from 'src/paper/entities/paper.entity';
import { User } from 'src/user/entities/user.entity';
import { ManyToMany, JoinTable } from 'typeorm';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @ManyToMany(() => User, user => user.projects)
    oldusers: User[];
    @ManyToMany(() => Paper, paper => paper.projects)
    oldpapers: Paper[];
}
