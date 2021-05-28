import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/user/entities/user.entity';
import { ManyToMany, JoinTable } from 'typeorm';
import { CreatePaperDto } from './create-paper.dto';

export class UpdatePaperDto extends PartialType(CreatePaperDto) {
    @ManyToMany(() => User, user => user.papers)
    @JoinTable()
    oldusers: User[];
}
