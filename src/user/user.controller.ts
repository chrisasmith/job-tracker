import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/azure-database';
import { Container } from '@azure/cosmos';
import { IUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(@InjectModel(User) private readonly jobContainer: Container) {}

  @Post('create')
  async create(@Body() payload: IUserDto): Promise<User> {
    const newUser = new User();

    newUser.created = Date.now().toString();
    newUser.userName = payload.userName;
    newUser.fullName = payload.fullName;
    newUser.email = payload.email;
    newUser.role = payload.role;
    newUser.password = payload.password;

    const { resource } = await this.jobContainer.items.create(newUser);
    return {
      id: resource.id,
      created: resource.created,
      userName: resource.userName,
      fullName: resource.fullName,
      email: resource.email,
      role: resource.role,
    };
  }

  @Get('users')
  async users(): Promise<User[]> {
    const sqlQuery = 'select * from c';
    const cosmosResults = await this.jobContainer?.items
      ?.query<User>(sqlQuery)
      .fetchAll();

    return cosmosResults.resources.map<IUserDto>((value) => {
      return {
        id: value.id,
        created: value.created,
        userName: value.userName,
        fullName: value.fullName,
        email: value.email,
        role: value.role,
      };
    });
  }

  @Post('login')
  async login(@Body() payload): Promise<User[]> {
    const sqlQuery = 'select * from c';
    const cosmosResults = await this.jobContainer?.items
      ?.query<User>(sqlQuery)
      .fetchAll();

    return cosmosResults.resources
      .map<IUserDto>((value) => {
        return {
          id: value.id,
          created: value.created,
          userName: value.userName,
          fullName: value.fullName,
          email: value.email,
          role: value.role,
        };
      })
      .filter(
        (user) =>
          user.userName === payload.userName &&
          user.password === payload.password,
      );
  }
}
