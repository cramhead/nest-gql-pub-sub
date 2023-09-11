import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { CommentsModule } from '../comments/comments.module';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [CommentsModule, AuthorsModule],
  providers: [PostsResolver, PostsService],
  exports: [PostsService, PostsResolver]
})
export class PostsModule {}
