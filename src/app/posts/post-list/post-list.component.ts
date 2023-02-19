import { ConfigService } from 'src/app/config/config.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.configService.getPosts()
    .subscribe((posts) => {
      this.posts = posts.posts;
      return this.posts.filter(post => post.isDeleted === false);
    });
  }

  getPostById(_id: object){
    return this.configService.getPostById(_id).subscribe();
  }

  onPostDelete(_id: object){
    this.configService.deletePost(_id).subscribe(() => {
      this.getAll();
    });
  }


}

