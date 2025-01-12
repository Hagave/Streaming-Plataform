import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueuesModule } from 'src/queues/queues.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [PrismaModule, QueuesModule, S3Module],
})
export class VideosModule {}
