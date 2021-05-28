
import { configService } from 'src/lib/config.service'
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './local_auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: configService.getValue('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy,UserService],
  exports: [AuthService],
})
export class AuthModule {}