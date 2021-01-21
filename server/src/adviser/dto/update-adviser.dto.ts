import { PartialType } from '@nestjs/mapped-types';
import { CreateAdviserDto } from './create-adviser.dto';

export class UpdateAdviserDto extends PartialType(CreateAdviserDto) {}
