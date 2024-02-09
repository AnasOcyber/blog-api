import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find();
    if (posts.length === 0) throw new NotFoundException('No post found');
    return posts;
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException(`The post with ${id} not found`);

    return post;
  }

  async create({ userId, ...postDto }: CreatePostDto): Promise<Post> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const post = await this.postModel.create(postDto);
    await user.updateOne({ $push: { posts: post } });

    return post;
  }

  async update(id: string, post: CreatePostDto): Promise<Post> {
    try {
      return await this.postModel.findByIdAndUpdate(id, post, {
        new: true,
      });
    } catch (error) {
      throw new NotFoundException(`The post with ${id} not found`);
    }
  }

  async delete(id: string): Promise<string> {
    const post = await this.postModel.findByIdAndDelete(id);
    if (!post) throw new NotFoundException(`The post with ${id} not found`);

    return 'Deleted successfully';
  }

  async addComments(postId: string, commentId: string) {
    return this.postModel.findByIdAndUpdate(
      postId,
      {
        $addToSet: { comments: commentId },
      },
      { new: true },
    );
  }
}
