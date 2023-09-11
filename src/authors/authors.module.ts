import { Module, forwardRef } from '@nestjs/common';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [forwardRef(() => PostsModule)],
  providers: [AuthorsResolver, AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
