import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../posts/post.model';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get("/routes/posts");
  }

  getPostById(_id: object): Observable<any> {
    return this.http.get(`/routes/posts/${_id}`);
  }

  addPost(title: string, content: string): Observable<any> {
    const date = new Date();
    const post: Post = {
      _id: {},
      id: uuidv4(),
      title: title,
      content: content,
      created_date: date,
      isDeleted: false,
    };
    return this.http.post("/routes/posts/new-post", post);
  }

  deletePost(_id: object): Observable<any> {
    return this.http.put(`/routes/posts/${_id}`, null);
  }

}
