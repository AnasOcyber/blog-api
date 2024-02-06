import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from './post.schema';

@Schema()
export class Author {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Post' })
  posts: Post[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
