import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async get(id: string) {
    return await this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  async update(id: string, createUserDto: CreateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, createUserDto);
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  addPosts(userId: string, postId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { posts: postId },
      },
      { new: true },
    );
  }
}
