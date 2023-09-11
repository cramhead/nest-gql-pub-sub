import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';
import { PubSub } from "graphql-subscriptions";
import { Comment } from '../comments/models/comment.model'
import { Author } from '../authors/models/author.model';
import { AuthorsService } from '../authors/authors.service';

const pubSub = new PubSub();
@Resolver(of => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
    private readonly authorsService: AuthorsService
  ) {

  }
  @Query(returns => Post)
  async post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findAll({ authorId: id });
  }

  @ResolveField(returns => Author)
  async author(@Parent() post: Post) {
    const { id } = post;
    const authorId = this.postsService.findAuthorId(id);
    const a = this.authorsService.findOneById(authorId)
    return a;
  }

  @ResolveField(returns => [Comment], { nullable: 'items' })
  async comments(@Parent() post: Post) {
    const { id } = post;
    return this.commentsService.findAll(id)
  }
  @Mutation(returns => Post)
  async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
    return this.postsService.upvoteById({ id: postId });
  }
  @Mutation(returns => Post)
  async addPost(
    @Args('title', { type: () => String }) title: string,
    @Args('authorId', { type: () => Int }) authorId: number,
  ) {
    const newPost = this.postsService.addPost({ title, authorId });
    pubSub.publish('postAdded', newPost );
    return newPost;
  }

  @Mutation(returns => Comment)
  async addComment(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('comment', { type: () => String }) comment: string,
  ) {
    const newComment = this.commentsService.addComment({ postId, comment });
    pubSub.publish('commentAdded', { commentAdded: newComment });
    return newComment;
  }

  @Subscription(returns => Post, {
    resolve(this: PostsResolver, value) {
      console.log(`postAdded subscription`, value)
      return value;
    }
  })
  postAdded() {
    return pubSub.asyncIterator('postAdded');
  }
}
