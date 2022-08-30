import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { Job } from './job.entity';
import { AzureCosmosDbModule } from '@nestjs/azure-database';

@Module({
  imports: [AzureCosmosDbModule.forFeature([{ collection: 'Job', dto: Job }])],
  controllers: [JobController],
})
export class JobModule {}
