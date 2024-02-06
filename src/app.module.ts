import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule, MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
