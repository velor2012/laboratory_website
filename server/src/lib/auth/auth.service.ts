import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import  * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(username,true);
    if (user &&  bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id,role:user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}