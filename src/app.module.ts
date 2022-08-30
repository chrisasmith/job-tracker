import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AzureCosmosDbModule.forRoot({
      dbName: 'Jobs',
      endpoint: 'https://jobtracker.documents.azure.com:443/',
      key: 'KD6JzurDjaHEDdgnyopQjVVgOD0ByZYjEfElFj3kIX6KmhQRpHtCpuPNJiXqqOo8eMfQYdbADCAglOAeg10otA==',
    }),
    JobModule,
    UserModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
