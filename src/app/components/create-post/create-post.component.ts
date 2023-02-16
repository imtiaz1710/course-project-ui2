import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  header: string = '';
  description: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  savePost() {
    // create new post object and add to topic
    const newPost = { id: 22 + 1, header: this.header, description: this.description };
    //.post.posts.push(newPost);

    // close modal and reset input fields
    this.activeModal.close();
    this.header = '';
    this.description = '';
  }

  close(){
    this.activeModal.close();
  }
}
