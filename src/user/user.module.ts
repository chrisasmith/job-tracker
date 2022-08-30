import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { User } from './user.entity';

@Module({
  imports: [
    AzureCosmosDbModule.forFeature([{ collection: 'users', dto: User }]),
  ],
  controllers: [UserController],
})
export class UserModule {}
