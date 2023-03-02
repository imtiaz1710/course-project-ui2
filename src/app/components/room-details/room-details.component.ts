import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  roomId: string;
  room: any;

  constructor(private roomService: RoomService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params['roomId'];
      this.getRoomDetails(this.roomId);
   });
  }

  getRoomDetails(roomId: string){
    return this.roomService.getRoomDetailsById(roomId).subscribe({
      next: room => {
        this.room = room.data;
      },
      error: err => console.log(err)
    })
  }

  addComment(post: any, comment: string) {
    let x = <HTMLInputElement>document.getElementById(`comment${post.id}`);
    post.comments.push(x.value);
    x.value = '';
  }
}
