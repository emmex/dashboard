import {Injectable} from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'user',
        password: '123',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

}


export type User = any;
