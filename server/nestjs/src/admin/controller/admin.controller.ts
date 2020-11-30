import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthenticationGuard} from '../../auth/guard/authentication.guard';
import {AdminService} from '../service/admin.service';
import {User} from '../../user/entity/user.entity';
import {ObjectID} from 'mongodb';
import {UserService} from '../../user/service/user.service';
import {RolesGuard} from '../../auth/guard/roles.guard';
import {Roles} from '../../common/decorator/roles.decorator';
import {UserRole} from '../../user/entity/user-role.entity';

@Controller('/api/admin')
@UseGuards(AuthenticationGuard, RolesGuard)
export class AdminController {

  constructor(private adminService: AdminService, private userService: UserService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/users')
  @Roles(UserRole.Admin)
  async getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;
    return await this.adminService.getPage({limit, page});
  }

  @Delete('/:id')
  @Roles(UserRole.Admin)
  async removeUser(@Param('id') id: string) {
    await this.adminService.removeUser(id);
  }

  @Post('/:id')
  @Roles(UserRole.Admin)
  async editUser(@Param('id') id: string, @Body() user: User) {
    user._id = new ObjectID(id);
    await this.adminService.editUser(user);
  }

  @Put('/add-user')
  @Roles(UserRole.Admin)
  async addUser(@Body() user: User) {
    await this.userService.register(user);
  }

  @Get('/roles')
  async getRolesList() {
    return await this.userService.rolesList();
  }

}
