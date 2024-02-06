import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

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

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postModel.create({
      ...createPostDto,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    });
  }

  async update(id: string, createPostDto: CreatePostDto): Promise<Post> {
    try {
      return await this.postModel.findByIdAndUpdate(id, createPostDto, {
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
}
