import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class VideosService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async create(
    createVideoDto: CreateVideoDto,
    file: Express.Multer.File,
    userId: number,
  ) {
    const { description, title } = createVideoDto;

    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const s3Result = await this.s3Service.uploadFile(file, 'my-streaming-app');

    const video = await this.prisma.video.create({
      data: {
        title,
        description,
        videoData: s3Result.Location,
        userId,
      },
    });
    return video;
  }

  async findAllByUser(userId: number) {
    return await this.prisma.video.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.video.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
      },
    });
  }

  // async update(id: number, updateVideoDto: UpdateVideoDto) {
  //   return await this.prisma.video.update({
  //     where: { id },
  //   });
  // }

  async remove(userId: number, id: number) {
    const video = await this.prisma.video.findUnique({ where: { id } });

    if (!video) {
      throw new HttpException(
        'Video with the given ID not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (video.userId !== userId) {
      throw new HttpException(
        'You do not have permission to delete this video.',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.prisma.video.delete({ where: { id } });
  }

  async removeMany(userId: number) {
    const videos = await this.prisma.video.findMany({ where: { userId } });

    if (videos.length === 0) {
      throw new HttpException(
        'No videos found for this user.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.video.deleteMany({ where: { userId } });
  }
}
