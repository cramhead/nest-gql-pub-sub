import { Injectable } from '@nestjs/common';

const posts = [
  { id: 1, votes: 4, title: "a post from author 1", authorId: 1 },
  { id: 2, votes: 4, title: "a post from author 2", authorId: 2 },
  { id: 3, votes: 4, title: "another post from author 1", authorId: 1 },
  { id: 4, votes: 4, title: "another post from author 2", authorId: 2 },
]
@Injectable()
export class PostsService {

  findAll({authorId}) {
    const p = posts.filter(p => p.authorId === authorId)
    return p;
  }
}
