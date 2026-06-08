import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId;

  @Prop({ default: null })
  imageUrl: string;

  @Prop({ type: Number, default: 0 })
  commentsCount: number;

  @Prop({ type: Number, default: 0 })
  upvotesCount: number;

  @Prop({ type: Number, default: 0 })
  downvotesCount: number;

  @Prop({ type: Types.ObjectId, ref: 'Channel', required: false, default: null })
  channelId: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);