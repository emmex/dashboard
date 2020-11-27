import {Injectable} from '@nestjs/common';
import {UserService} from '../../user/service/user.service';
import {User} from '../../user/entity/user.entity';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (user && user.password === pass) { // use bcrypt
      const sessionUser = new User();
      sessionUser.email = user.email;
      return sessionUser;
    }
    return null;
  }

}
