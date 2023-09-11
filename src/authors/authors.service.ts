import { Injectable } from '@nestjs/common';


const authors = [
  {id: 1, firstName: "bobo", lastName: "pres"},
  {id: 2, firstName: 'sally', lastName: "sadukar"}
]
@Injectable()
export class AuthorsService {
   findOneById(id){
    const a = authors.find(author => id === author.id )
    return a;
  } 
}
