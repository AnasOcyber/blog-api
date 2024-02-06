import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/post/schema/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Post' })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);