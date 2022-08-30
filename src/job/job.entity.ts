import { CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('id')
export class Job {
  id: string;
  referenceId: string;
  estimate: string;
  type: string;
  customer: string;
  created: string;
  arrived: string;
  available: boolean;
  status: string;
  assignedTo: Assigned[];
  instructions: Instructions;
  comments: string[];
}

class Instructions {
  inventory: string;
  dock: string;
}

class Assigned {
  id: string;
  name: string;
  assignedBy: string;
  progress: { start: string; stop: string }[];
  status: string;
  comments: [];
}
