import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PostModule } from 'src/post/post.module';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
