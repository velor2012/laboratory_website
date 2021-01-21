import { Module, forwardRef } from '@nestjs/common';
import { StuService } from './stu.service';
import { StuController } from './stu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stu } from './entities/stu.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stu]),forwardRef(() => UserModule),],
  providers: [StuService,UserService],
  controllers: [StuController],
  exports:[TypeOrmModule]
})
export class StuModule {}
