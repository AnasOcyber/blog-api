import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PostModule, MongooseModule.forRoot('mongodb://localhost/nest'), UserModule],
})
export class AppModule {}
