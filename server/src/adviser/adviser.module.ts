import { Module } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { AdviserController } from './adviser.controller';
import { Adviser } from './entities/adviser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Adviser])],
  providers: [AdviserService],
  controllers: [AdviserController],
  exports:[TypeOrmModule]
})
export class AdviserModule {}
