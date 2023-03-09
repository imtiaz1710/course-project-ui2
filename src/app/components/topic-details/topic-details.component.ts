import { NotExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private modalService: NgbModal, private router: Router,
    private roomAService: RoomService, private currentTopicService: CurrentTopicService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.currentTopicService.currentTopic$.next(this.id ?? 'all');

      if (this.id) {
        this.getRoomsByTopic(this.id);
      }
      else {
        this.getAllRooms();
      }
    });
  }

  enterRoom(name: string) {
    this.router.navigate([`/topics/${this.id ?? 'all'}/${name}`]);
  }

  getRoomsByTopic(topic: any) {
    return this.roomAService.getRoomsByTopic(topic).subscribe({
      next: (rooms) => {
        this.posts = rooms;
      }
    });
  }

  getAllRooms() {
    this.roomAService.getRooms().subscribe({
      next: res => {
        this.posts = res.data.map(x => { return { ...x, showComment: false } })
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

  gotoProfile(id: string) {
    this.router.navigate(['/profile', id]);
  }
}
