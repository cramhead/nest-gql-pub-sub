import { Injectable } from '@nestjs/common';

const comments = [
  { id: 1, postId: 1, comment: "Wow, that was great!" }
]
@Injectable()
export class CommentsService {

  addComment({postId, comment}) {
    const id = comments.length
    const c = { id, postId, comment }
    comments.push(c)
    return c;
  }

  findAll(postId){
    const c = comments.filter(c => c.postId === postId)
    return c;
  }
  findOneById(commentId) {
    const c = comments.filter(c => c.id === commentId)
    return c;
  }
}
