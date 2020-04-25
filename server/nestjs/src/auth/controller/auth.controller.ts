import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {LoginGuard} from "../guard/login.guard";

@Controller('/auth')
export class AuthController {

  constructor() {
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  async login(@Request() request) {
    return;
  }

  @Get('/logout')
  logout(@Request() request) {
    request.session.destroy();
  }

  @Get('/check-session')
  getProfile(@Request() request) {
    return request.session?.passport?.user != null;
  }

}
