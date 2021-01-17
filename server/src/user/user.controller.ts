import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';

@ApiTags("管理员")
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

  @Get()
  @ApiOperation({summary:'获取所有用户'})
  async findAll() {
    const users =  await this.userService.findAll();
    return users
  }

  
  @Get(":id")
  @ApiOperation({summary:'获取一个用户'})
  async detail(@Param("id") id: string, @Req() req) {
      if (!req) return "";
      return await this.userService.findOne(id);
  }
}