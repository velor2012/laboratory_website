import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/lib/config.service'
import { User } from "src/user/user.entity";
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
    entities: [
      User
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