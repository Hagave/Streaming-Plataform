import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueuesService } from './queues.service';
import { QueuesProcessor } from './queues.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video', // Nome da fila
    }),
  ],
  providers: [QueuesService, QueuesProcessor],
  exports: [QueuesService],
})
export class QueuesModule {}
