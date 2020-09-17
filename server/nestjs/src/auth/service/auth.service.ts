import {Injectable} from '@nestjs/common';
import {UserService} from '../../user/service/user.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UserService) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === pass) { // use bcrypt
      return {email: user.email};
    }
    return null;
  }

}
