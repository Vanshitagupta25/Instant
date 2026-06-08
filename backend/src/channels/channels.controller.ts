import { Controller, Get, Post, Body, Param, UseGuards, HttpStatus, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('channels')
@UseGuards(AuthGuard)
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createChannel(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllChannels() {
    return this.channelsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getChannelById(@Param('id') id: string) {
    return this.channelsService.findOne(id);
  }
}