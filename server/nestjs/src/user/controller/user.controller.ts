import {Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Request, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthenticationGuard} from '../../auth/guard/authentication.guard';
import {UserService} from '../service/user.service';

@Controller('/api/user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthenticationGuard)
  @Get('/profile')
  async getProfile(@Request() request) {
    return await this.userService.getByEmail(request.user.email);
  }

  @UseGuards(AuthenticationGuard)
  @Get('/send-email-confirmation')
  async sendConfirmEmail(@Request() request) {
    await this.userService.sendConfirmationEmail(request.user.email);
  }

  @Post('/confirm-email/:uuid')
  async confirmEmail(@Param('uuid') uuid, @Body('email') email: string) {
    await this.userService.confirmEmail(uuid, email);
  }

}
