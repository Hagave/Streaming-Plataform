import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { QueuesService } from 'src/queues/queues.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multerOptions.utils';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly videoQueue: QueuesService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Headers('userId') userId: string,
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userIdNumber = parseInt(userId, 10);

    if (isNaN(userIdNumber)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    return this.videosService.create(createVideoDto, file, userIdNumber);
  }

  @Get()
  async findAllByUser(@Headers('user-id') userId: string) {
    return this.videosService.findAllByUser(parseInt(userId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
  //   return this.videosService.update(+id, updateVideoDto);
  // }

  @Delete(':id')
  async delete(@Headers('user-id') userId: string, @Param('id') id: number) {
    return this.videosService.remove(parseInt(userId), id);
  }
}
