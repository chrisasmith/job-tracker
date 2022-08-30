import { CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('id')
export class User {
  id: string;
  created: string;
  userName: string;
  role: number;
  password?: string;
  fullName?: string;
  email?: string;
}
