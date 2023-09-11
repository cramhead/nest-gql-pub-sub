import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService){

  }
  @Query(returns => Post)
  async post(@Args('id', {type: () => Int }) id: number){
    return this.postsService.findAll({authorId: id});
  }
}
