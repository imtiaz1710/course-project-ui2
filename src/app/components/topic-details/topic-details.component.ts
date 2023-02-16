import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent {
  //topic: any;
  posts: any[] = [];

  constructor(private route: ActivatedRoute, private modalService: NgbModal, ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // const id = parseInt(params.get('id')?.toString());
      // this.topic = { id: id, name: 'Python' };
      this.posts = [
        { id: 1, header: 'First Post', description: 'This is the first post', comments: [] },
        { id: 2, header: 'Second Post', description: 'This is the second post', comments: [] }
      ];
    });
  }

  addComment(post: any, comment: string) {
    post.comments.push(comment);
  }

  openCreatePostModal() {
    const modalRef = this.modalService.open(CreatePostComponent);
    modalRef.componentInstance.topic = this.posts;
  }
}
