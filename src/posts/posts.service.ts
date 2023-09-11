import { Injectable } from '@nestjs/common';

const posts = [
  { id: 1, votes: 4, title: "a post from author 1", authorId: 1 },
  { id: 2, votes: 4, title: "a post from author 2", authorId: 2 },
  { id: 3, votes: 4, title: "another post from author 1", authorId: 1 },
  { id: 4, votes: 4, title: "another post from author 2", authorId: 2 },
  { id: 5, votes: 2, title: "another other post from author 2", authorId: 2 },
]
@Injectable()
export class PostsService {

  findAll({authorId}) {
    const p = posts.filter(p => p.authorId === authorId)
    return p;
  }
  findAuthorId(postId){
    const p = posts.find(p => p.id === postId);
    return p.authorId
  }
  addPost({ title, authorId }){
    const id = posts.length
    const p = {id, title, authorId, votes: 0}
    posts.push(p);
    return p;
  }
  upvoteById({ id }){
    const p = posts.find(p => p.id = id)
    if(p){
      p.votes = p.votes +1
    }
    return p;
  }
}
