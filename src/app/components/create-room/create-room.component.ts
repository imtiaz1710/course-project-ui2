import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  name: string = '';
  description: string = '';
  topic: string = '';

  constructor(public activeModal: NgbActiveModal, public route: ActivatedRoute, public roomService: RoomService) {}

  ngOnInit(): void {
  }

  saveRoom() {
    // create new post object and add to topic
    //const newPost = { id: 22 + 1, header: this.name, description: this.description };
    //.post.posts.push(newPost);
    this.roomService.createRoom(this.topic, this.name, this.description).subscribe({
      next: (res) => {
      }, error: (err) => { 
      }
    })
    // close modal and reset input fields
    this.activeModal.close();
    this.name = '';
    this.description = '';
  }

  close(){
    this.activeModal.close();
  }
}
