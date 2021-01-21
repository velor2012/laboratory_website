import { PartialType } from '@nestjs/mapped-types';
import { CreateStuDto } from './create-stu.dto';

export class UpdateStuDto extends PartialType(CreateStuDto) {}
