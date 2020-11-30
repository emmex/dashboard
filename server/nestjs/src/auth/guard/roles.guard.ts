import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from '../../user/service/user.service';
import {User} from '../../user/entity/user.entity';
import {Reflector} from '@nestjs/core';
import {UserRole} from '../../user/entity/user-role.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector, private userService: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.session?.passport?.user?.email == null) {
      return true;
    }
    try {
      const roles: UserRole[] = this.reflector.get<UserRole[]>('roles', context.getHandler());
      if (roles == null) {
        return true;
      }

      const user: User = await this.userService.getByEmail(request.session.passport.user.email)
      return user == null ? false : user.hasRoles(roles);
    } catch (e) {
      throw new ForbiddenException();
    }
  }

}
