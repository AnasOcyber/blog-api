import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/post/schema/post.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  content: string;

  @Prop()
  author: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
