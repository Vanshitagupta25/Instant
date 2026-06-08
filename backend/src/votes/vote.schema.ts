import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VoteDocument = Vote & Document;

@Schema({ timestamps: true })
export class Vote {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: Types.ObjectId;

  @Prop({ type: String, enum: ['up', 'down'], required: true })
  type: 'up' | 'down';
}

// 🎯 No unique indexes here anymore so records can accumulate continuously
export const VoteSchema = SchemaFactory.createForClass(Vote);