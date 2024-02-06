import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
