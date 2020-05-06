import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {AuthenticationGuard} from '../../auth/guard/authentication.guard';
import {UserService} from '../service/user.service';
import {UserDto} from '../dto/user.dto';

@Controller('/api/user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @UseGuards(AuthenticationGuard)
  @Get('/profile')
  async getProfile(@Request() request) {
    return new UserDto(await this.userService.findByEmail(request.user.email));
  }

}
