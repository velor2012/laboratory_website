import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './lib/common.module';
import { ProjectModule } from './project/project.module';
import { TeacherModule } from './teacher/teacher.module';
import { StuModule } from './stu/stu.module';
import { ResearcherModule } from './researcher/researcher.module';
import { PatentModule } from './patent/patent.module';
import { PaperModule } from './paper/paper.module';
import { CompetitionModule } from './competition/competition.module';
import { AdviserModule } from './adviser/adviser.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    ProjectModule,
    TeacherModule,
    StuModule,
    ResearcherModule,
    PatentModule,
    PaperModule,
    CompetitionModule,
    AdviserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
