import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueuesService {
  constructor(@InjectQueue('video') private readonly videoQueue: Queue) {}

  async addVideoToQueue(videoPath: string) {
    await this.videoQueue.add({ videoPath });
    console.log('Video adicionado a fila de processamento!');
  }
}
