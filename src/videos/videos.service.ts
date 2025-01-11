import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async create(createVideoDto: CreateVideoDto, userId: number) {
    const { description, title, url } = createVideoDto;

    const video = await this.prisma.video.create({
      data: { title, description, url, userId },
    });
    return video;
  }

  async findAllByUser(userId: number) {
    return await this.prisma.video.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    return await this.prisma.video.findUnique({ where: { id } });
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    return await this.prisma.video.update({
      where: { id },
      data: updateVideoDto,
    });
  }

  async remove(userId: number, id: number) {
    const video = await this.prisma.video.findUnique({ where: { id } });

    if (!video) {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }

    if (video.userId !== userId) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    return this.prisma.video.delete({ where: { id } });
  }

  async removeMany(userId: number) {
    const videos = await this.prisma.video.findMany({ where: { userId } });

    if (videos.length === 0) {
      throw new HttpException(
        'No videos found for this user',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.video.deleteMany({ where: { userId } });
  }
}
