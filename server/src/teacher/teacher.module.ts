import { Module, forwardRef } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]),forwardRef(() => UserModule)],
  providers: [TeacherService,UserService],
  controllers: [TeacherController],
  exports:[TypeOrmModule]
})
export class TeacherModule {}
