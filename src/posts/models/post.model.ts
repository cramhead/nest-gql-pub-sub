import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/models/author.model';

@ObjectType()
export class Post {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => Author)
  author: Author;

  @Field(type => Int, { nullable: true })
  votes?: number;
}