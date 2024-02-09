import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Post } from 'src/post/schema/post.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async find(): Promise<Comment[]> {
    return await this.commentModel.find().populate('post');
  }

  async create({ postId, ...comment }: CreateCommentDto): Promise<Comment> {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    const newComment = await this.commentModel.create(comment);

    await post.updateOne({ $push: { comments: newComment.id } });
    return newComment;
  }

  async update(id: string, content: string): Promise<Comment> {
    return await this.commentModel.findByIdAndUpdate(id, { content });
  }

  async delete(id: string): Promise<Comment> {
    return await this.commentModel.findByIdAndDelete(id);
  }
}
