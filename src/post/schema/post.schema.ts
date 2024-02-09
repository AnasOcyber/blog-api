import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comment/schema/comment.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: Date.now() })
  createdAt: string;

  @Prop({ default: Date.now() })
  updatedAt: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment.name }] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
