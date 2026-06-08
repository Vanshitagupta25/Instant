import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Channel, ChannelSchema } from './schemas/channel.schema';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Channel.name,
        schema: ChannelSchema,
      },
    ]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}