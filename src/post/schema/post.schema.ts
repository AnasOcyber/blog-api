import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from './author.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Author' })
  author: Author;

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
