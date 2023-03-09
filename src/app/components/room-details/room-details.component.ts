import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  roomId: string;
  room: any;

  constructor(private roomService: RoomService, private route: ActivatedRoute, private router: Router) {
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

  addComment(room: any, comment: string) {
    let x = <HTMLInputElement>document.getElementById(`comment${room.id}`);
    //post.comments.push(x.value);
    this.roomService.commentRoom(room.id, x.value).subscribe({
      next: (res) => {
        x.value = '';
        this.getRoomDetails(room.id);
      },
      error: err => console.log(err)
    })
  }

  gotoProfile(id: string) {
    this.router.navigate(['/profile', id]);
  }
}
