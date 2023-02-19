import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Component } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {

  public info: string = '';

  constructor(private configService: ConfigService,private route:ActivatedRoute, private router:Router) {}

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    return this.configService
    .addPost(
      form.value.title,
      form.value.content
    ).subscribe((msg => {
      this.info = msg.message;
    }));
  }

}
