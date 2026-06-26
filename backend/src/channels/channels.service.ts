import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from './schemas/channel.schema';
import { CreateChannelDto } from './dtos/create-channel.dto';

@Injectable()
export class ChannelsService {
  private readonly logger = new Logger(ChannelsService.name);

  constructor(
    @InjectModel(Channel.name) private readonly channelModel: Model<ChannelDocument>,
  ) { }

  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    try {
      const newChannel = new this.channelModel(createChannelDto);
      return await newChannel.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Channel already exists');
      }
      this.logger.error(
        `Failed to create channel: ${error.message}`
      );
      throw new InternalServerErrorException(
        'Failed to create channel',
      );
    }
  }
  async findAll(userId: string): Promise<Channel[]> {
    try {
      return await this.channelModel
      .find({
         isActive: true,
         members: userId
        })
        .sort({ name: 1 })
        .exec();
    } catch (error: any) {
      this.logger.error(`Failed to fetch channels: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch channels');
    }
  }

  async findOne(id: string, userId: string): Promise<Channel> {
    const channel = await this.channelModel.findById(id).exec();
    
    if (!channel || !channel.isActive) {
      throw new NotFoundException('Channel not found');
    }
    const isMember = channel.members.includes(userId);
    if (!isMember) {
      throw new ForbiddenException('Access denied. You must join this channel to view it.');
    }
    return channel;
  }
}