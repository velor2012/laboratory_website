import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adviser } from "src/adviser/entities/adviser.entity";
import { Competition } from "src/competition/entities/competition.entity";
import { configService } from 'src/lib/config.service'
import { Paper } from "src/paper/entities/paper.entity";
import { Patent } from "src/patent/entities/patent.entity";
import { Project } from "src/project/entities/project.entity";
import { Researcher } from "src/researcher/entities/researcher.entity";
import { Stu } from "src/stu/entities/stu.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { User } from "src/user/entities/user.entity";
let my_module =   TypeOrmModule.forRootAsync({
  useFactory() { 
    return {
    type: 'mysql',
    host: configService.getValue('DB_HOST'),
    port: parseInt(configService.getValue('DB_PORT')),
    username: configService.getValue('DB_USERNAME'),
    password: configService.getValue('DB_USERPASSWORD'),
    database: configService.getValue('DB_DATABASE'),
    connectTimeout:100000,
    acquireTimeout:100000,
    synchronize:true,
    entities: [
      User,
      Project,
      Paper,
      Patent,
      Stu,
      Teacher,
      Adviser,
      Researcher,
      Competition,
    ],
  }
}
})

@Global()
@Module({
    imports: [my_module],
    exports: [my_module],
})
export class DbModule {}