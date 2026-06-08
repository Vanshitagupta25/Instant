import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Channel } from '../channels/schemas/channel.schema';
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Channel.name) private readonly channelModel: Model<Channel>,
  ) { }

  async searchUsersAndChannels(searchQuery: string) {
    if (!searchQuery || !searchQuery.trim()) {
      return { channels: [], users: [] };
    }
    const searchRegex = new RegExp(searchQuery, 'i');

    const [users, channels] = await Promise.all([
      this.userModel
        .find({
          $or: [
            { username: { $regex: searchRegex } },
            { name: { $regex: searchRegex } }
          ]
        })
        .select('_id name avatarUrl')
        .limit(10)
        .exec(),

      this.channelModel
        .find({
          name: { $regex: searchRegex }
        })
        .select('_id name logoUrl description')
        .limit(10)
        .exec(),
    ]);

    return {
      success: true,
      data: {
        users,
        channels,
      },
    };
  }
}