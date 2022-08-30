import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/azure-database';
import { Container } from '@azure/cosmos';
import { Job } from './job.entity';
import { IJobDto } from './job.dto';

@Controller('job')
export class JobController {
  constructor(@InjectModel(Job) private readonly jobContainer: Container) {}

  @Get('all')
  async getJobs() {
    const sqlQuery = 'select * from c';

    const cosmosResults = await this.jobContainer?.items
      ?.query<Job>(sqlQuery)
      .fetchAll();

    return cosmosResults.resources.map<IJobDto>((value) => {
      return {
        id: value.id,
        referenceId: value.referenceId,
        customer: value.customer,
        created: value.created,
        arrived: value.arrived,
        assignedTo: value.assignedTo,
        available: value.available,
        type: value.type,
        instructions: value.instructions,
        status: value.status,
        comments: value.comments,
        estimate: value.estimate,
      };
    });
  }

  @Post('create')
  async create(@Body() payload: IJobDto): Promise<Job> {
    const newJob = new Job();

    newJob.created = Date.now().toString();
    newJob.customer = payload.customer;
    newJob.arrived = payload.arrived;
    newJob.assignedTo = payload.assignedTo;
    newJob.available = payload.available;
    newJob.referenceId = payload.referenceId;
    newJob.type = payload.type;
    newJob.instructions = payload.instructions;
    newJob.status = payload.status;
    newJob.comments = payload.comments;
    newJob.estimate = payload.estimate;

    const { resource } = await this.jobContainer.items.create(newJob);
    return {
      id: resource.id,
      created: resource.created,
      customer: resource.customer,
      arrived: resource.arrived,
      assignedTo: resource.assignedTo,
      available: resource.available,
      referenceId: resource.referenceId,
      type: resource.type,
      instructions: resource.instructions,
      status: resource.status,
      comments: resource.comments,
      estimate: resource.estimate,
    };
  }
}
