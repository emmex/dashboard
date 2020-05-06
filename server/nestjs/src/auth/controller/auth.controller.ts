import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {LoginGuard} from "../guard/login.guard";
import {User} from '../../user/entity/user.entity';
import {UserService} from '../../user/service/user.service';

@Controller('/api/auth')
export class AuthController {

  constructor(private userService: UserService) {
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  async login() {
    return;
  }

  @Get('/logout')
  logout(@Request() request) {
    request.session.destroy();
  }

  @Post('/register')
  async register(@Body() user: User) {
    await this.userService.register(user);
  }

  @Get('/check-session')
  checkSession(@Request() request): boolean {
    return request.session?.passport?.user != null;
  }

}
