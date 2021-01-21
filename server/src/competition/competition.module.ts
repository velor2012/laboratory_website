import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CompetitionController } from './competition.controller';
import { Competition } from './entities/competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Competition])],
  providers: [CompetitionService],
  controllers: [CompetitionController],
  exports:[TypeOrmModule]
})
export class CompetitionModule {}
