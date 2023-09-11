import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  postId: number;

  @Field(type => String)
  comment: string;
}