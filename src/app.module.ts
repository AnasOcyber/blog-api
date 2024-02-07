import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    PostModule,
    UserModule,
  ],
})
export class AppModule {}
