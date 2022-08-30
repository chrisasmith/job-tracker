import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'csmith',
      password: 'live',
      fullName: 'Christopher Smith',
      email: 'christopher.smith@servicerite.net',
      role: 0,
    },
    {
      userId: 4,
      username: 'egriffin',
      password: '8850',
      fullName: 'Emil Griffin',
      email: 'Emil.Griffin@servicerite.net',
      role: 2,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    console.log('Username: ', username);
    return this.users.find((user) => user.username === username);
  }
}
