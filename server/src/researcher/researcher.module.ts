import { Module, forwardRef } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { ResearcherController } from './researcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Researcher]),forwardRef(() => UserModule)],
  providers: [ResearcherService,UserService],
  controllers: [ResearcherController],
  exports:[TypeOrmModule]
})
export class ResearcherModule {}
