import {User} from '../entity/user.entity';

export class UserDto {

  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;

  constructor(user: User) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.emailConfirmed = user.emailConfirmed;
  }

}
