import { NotExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrentTopicService } from 'src/app/services/current-topic.service';
import { RoomService } from 'src/app/services/room.service';
import { CreateRoomComponent } from '../create-room/create-room.component';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  posts: any[] = [];
  topic: any;
  id: string;
  constructor(private route: ActivatedRoute, private modalService: NgbModal, 
    private roomAService: RoomService, private currentTopicService: CurrentTopicService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.currentTopicService.currentTopic$.next(this.id);
      
      if(this.id){
        this.getRoomsByTopic(this.id);
      }
      else{
        this.getAllRooms();
      }
   });
   
    // this.topic = { id: id, name: 'Python' };
    //this.id = this.route.snapshot.paramMap.get('id');

    // this.posts = [
    //   { id: 1, name: 'First Post', description: 'This is the first post', comments: [], showComment: false },
    //   { id: 2, name: 'Second Post', description: 'This is the second post', comments: [], showComment: false },
    //   { id: 3, name: 'First Post', description: 'This is the first post', comments: [], showComment: false },
    //   { id: 4, name: 'Second Post', description: 'This is the second post', comments: [], showComment: false }
    // ];
  }

  getRoomsByTopic(topic: any){
    return this.roomAService.getRoomsByTopic(topic).subscribe({
      next: (rooms) => {
        this.posts = rooms;
      }
    });
  }

  getAllRooms() {
    this.roomAService.getRooms().subscribe({
      next: res => {
        this.posts = res.data.map(x => { return { id: x.id, Comment: x.comment, name: x.name,
           description: x.description, showComment: false } })
      }
    })
  }
  showCommentToggle(post: any) {
    post.showComment = !post.showComment;
  }

  addComment(post: any, comment: string) {
    let x = <HTMLInputElement>document.getElementById(`comment${post.id}`);
    post.comments.push(x.value);
    x.value = '';
  }

  openCreatePostModal() {
    this.topic = this.route.snapshot.paramMap.get('id');
    const modalRef = this.modalService.open(CreateRoomComponent);
    modalRef.result.then((response) => {
      this.getRoomsByTopic(this.id);
    })
    modalRef.componentInstance.topic = this.topic;
  }
}
