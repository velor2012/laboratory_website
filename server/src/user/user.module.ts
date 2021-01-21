import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/lib/auth/jwt_auth.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { AdviserModule } from 'src/adviser/adviser.module';
import { StuModule } from 'src/stu/stu.module';
import { ResearcherModule } from 'src/researcher/researcher.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),AuthModule,
  TeacherModule,AdviserModule,StuModule,ResearcherModule],
  providers: [UserService],
  controllers: [UserController],
  exports:[TypeOrmModule]
})
export class UserModule {}