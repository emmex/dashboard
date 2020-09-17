import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthenticationGuard} from '../../auth/guard/authentication.guard';
import {AdminService} from '../service/admin.service';
import {User} from '../../user/entity/user.entity';
import {ObjectID} from 'mongodb';
import {UserService} from '../../user/service/user.service';

@Controller('/api/admin')
export class AdminController {

  constructor(private adminService: AdminService, private userService: UserService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthenticationGuard)
  @Get('/users')
  async getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;
    return await this.adminService.getPage({limit, page});
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    await this.adminService.removeUser(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post('/:id')
  async editUser(@Param('id') id: string, @Body() user: User) {
    user._id = new ObjectID(id);
    await this.adminService.editUser(user);
  }

  @UseGuards(AuthenticationGuard)
  @Put('/add-user')
  async addUser(@Body() user: User) {
    await this.userService.register(user);
  }

}
