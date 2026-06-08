import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Vote, VoteDocument } from './vote.schema';
import { Post, PostDocument } from '../posts/schemas/post.schema';

@Injectable()
export class VotesService {
  constructor(
    @InjectModel(Vote.name)
    private readonly voteModel: Model<VoteDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async upvote(postId: string, userId: string) {
    const pId = new Types.ObjectId(postId);
    const uId = new Types.ObjectId(userId);

    const post = await this.postModel.findById(pId);
    if (!post) throw new NotFoundException('Post not found');

    await this.voteModel.create({ postId: pId, userId: uId, type: 'up' });

    return this.postModel.findByIdAndUpdate(
      pId,
      { $inc: { upvotesCount: 1 } },
      { new: true },
    );
  }

  async downvote(postId: string, userId: string) {
    const pId = new Types.ObjectId(postId);
    const uId = new Types.ObjectId(userId);

    const post = await this.postModel.findById(pId);
    if (!post) throw new NotFoundException('Post not found');

    await this.voteModel.create({ postId: pId, userId: uId, type: 'down' });


    return this.postModel.findByIdAndUpdate(
      pId,
      { $inc: { downvotesCount: 1 } },
      { new: true },
    );
  }
}