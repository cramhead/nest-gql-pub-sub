import { Args, Int, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { Author } from "./models/author.model";
import { AuthorsService } from "./authors.service";
import { PostsService } from "../posts/posts.service";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) { }

  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }

  // @Subscription(returns => Comment, {
  //   resolve(this: AuthorsResolver, value) {
  //     // "this" refers to an instance of "AuthorResolver"
  //     return value;
  //   }
  // })
  // commentAdded() {
  //   return pubSub.asyncIterator('commentAdded');
  // }
}