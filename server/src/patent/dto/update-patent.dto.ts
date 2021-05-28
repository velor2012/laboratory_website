import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/user/entities/user.entity';
import { ManyToMany, JoinTable } from 'typeorm';
import { CreatePatentDto } from './create-patent.dto';

export class UpdatePatentDto extends PartialType(CreatePatentDto) {
    @ManyToMany(() => User, user => user.patents)
    oldusers: User[];
}
