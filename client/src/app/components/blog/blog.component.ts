import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  message;
  messageClass;
  newPost = false;
  loadingBlogs = false;
  visibilite = 'uk-invisible';

  newBlogForm () {
    this.newPost = true;
  }

  reloadPost () {
    this.loadingBlogs = true;
    setTimeout(() => {
      this.loadingBlogs = false;
    }, 4000);
  }

  constructor() { }

  ngOnInit() {
  }

}
