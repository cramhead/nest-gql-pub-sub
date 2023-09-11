import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import {Comment} from './models/comment.model'

@Resolver(of => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService){}
  @Query(returns => Comment)
  async comment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.findOneById(id);
  }
}
