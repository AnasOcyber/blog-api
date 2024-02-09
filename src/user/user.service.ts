import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async get(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async create({ password, ...userDto }: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    return await this.userModel.create({
      ...userDto,
      password: hashedPassword,
      createdAt: new Date(),
    });
  }

  async update(id: string, createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, createUserDto);
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }
}
