import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { CommentsModule } from '../comments/comments.module';
import { AuthorsModule } from '../authors/authors.module';
import { PUB_SUB, PubsubModule } from '../pubsub/pubsub.module';

@Module({
  imports: [CommentsModule, AuthorsModule, PubsubModule],
  providers: [PostsResolver, PostsService],
  exports: [PostsService, PostsResolver]
})
export class PostsModule {}
