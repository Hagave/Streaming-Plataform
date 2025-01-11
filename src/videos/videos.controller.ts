import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async create(@Req() req, @Body() createVideoDto: CreateVideoDto) {
    const userId = req.user.id;
    return this.videosService.create(createVideoDto, userId);
  }

  @Get()
  async findAllByUser(@Req() req) {
    const userId = req.user.id;
    return this.videosService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id') id: number) {
    const userId = req.user.id;
    return this.videosService.remove(userId, id);
  }
}
