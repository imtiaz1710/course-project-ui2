import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: string = '';
  isEditMode: boolean = false;

  constructor(public activeModal: NgbActiveModal, public route: ActivatedRoute, public roomService: RoomService) { }

  ngOnInit(): void {
  }

  saveRoom() {
    if (this.isEditMode) {
      this.roomService.editRoom(this.id, this.name, this.description, this.topic).subscribe({
        next: res => {
          this.activeModal.close();
        },
        error: (err) => {
          this.activeModal.close();
        }
      });
    }
    else {
      this.roomService.createRoom(this.topic, this.name, this.description).subscribe({
        next: (res) => {
          this.activeModal.close();
        }, error: (err) => {
          this.activeModal.close();
        }
      })

      this.name = '';
      this.description = '';
    }
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
