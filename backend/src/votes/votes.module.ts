import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { Vote, VoteSchema } from './vote.schema';
import { Post, PostSchema } from '../posts/schemas/post.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Vote.name, schema: VoteSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}