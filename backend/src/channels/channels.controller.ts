import { Controller, Get, Post, Body, Param, UseGuards, HttpStatus, HttpCode, UsePipes, ValidationPipe, Req } from '@nestjs/common';
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
  async getAllChannels(@Req() req: any) {
    const userId = req.user.id;
    return this.channelsService.findAll(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getChannelById(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.channelsService.findOne(id, userId);
  }
}