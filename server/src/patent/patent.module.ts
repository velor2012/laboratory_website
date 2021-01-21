import { Module } from '@nestjs/common';
import { PatentService } from './patent.service';
import { PatentController } from './patent.controller';
import { Patent } from './entities/patent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Patent])],
  providers: [PatentService],
  controllers: [PatentController],
  exports:[TypeOrmModule]
})
export class PatentModule {}
