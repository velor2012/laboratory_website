import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/user/entities/user.entity';
import { ManyToMany } from 'typeorm';
import { CreateCompetitionDto } from './create-competition.dto';

export class UpdateCompetitionDto extends PartialType(CreateCompetitionDto) {
    @ManyToMany(() => User, user => user.competitions)
    oldusers: User[];
}
