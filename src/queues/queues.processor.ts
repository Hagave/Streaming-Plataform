import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('video')
export class QueuesProcessor {
  @Process()
  async handleVideoProcessing(job: Job) {
    const { videoPath } = job.data;
    console.log('Processando Video: ', videoPath);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`Vídeo processado com sucesso: ${videoPath}`);
  }
}
