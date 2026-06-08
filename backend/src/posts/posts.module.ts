import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './schemas/post.schema';
import { multerConfig } from 'src/config/multer.config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    multerConfig,
  ],

  controllers: [PostsController],
  providers: [PostsService],

  exports: [MongooseModule],
})
export class PostsModule {}