import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    try {
      if (request.session.passport.user) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

}
