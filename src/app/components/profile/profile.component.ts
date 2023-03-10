import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { RoomService } from 'src/app/services/room.service';
import { CreateRoomComponent } from '../create-room/create-room.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedFile: File;
  isDisable: boolean = true;
  profileId: string;
  profile: any;

  constructor(private fb: FormBuilder, private commonService: CommonService, private route: ActivatedRoute,
     private router: Router, private modalService: NgbModal, private roomService: RoomService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profileId = params['userId'];
      if (this.profileId == localStorage.getItem('profile_id')) this.isDisable = false;
      this.loadProfile(this.profileId);
      this.loadForm();
    });
  }

  loadProfile(profileId: string): void {
    this.commonService.getProfile(profileId).subscribe({
      next: (res) => {
        this.profile = res?.data;
        this.profileForm.patchValue(this.profile);
      }
    });
  }

  loadForm(): void {
    this.profileForm = this.fb.group({
      first_name: [{ value: '', disabled: this.isDisable }],
      last_name: [{ value: '', disabled: this.isDisable }],
      email: [{ value: '', disabled: true }],
      image: [{ value: '', disabled: this.isDisable }],
      github_link: [{ value: '', disabled: this.isDisable }]
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    const updatedProfile = {
      first_name: this.profileForm.value.first_name,
      last_name: this.profileForm.value.last_name,
      image: this.selectedFile,
      github_link: this.profileForm.value.github_link
    };

    const formData = new FormData();
    formData.append('first_name', updatedProfile.first_name);
    formData.append('last_name', updatedProfile.last_name);
    if(!!updatedProfile.image)
      formData.append('image', updatedProfile.image, updatedProfile?.image?.name);
    formData.append('github_link', updatedProfile.github_link);

    this.commonService.updateProfile(this.profileId, formData).subscribe({
      next: (res) => {
        this.loadProfile(this.profileId);
      }
    })
  }

  gotoRoom(id){
    this.router.navigate([`/topics/all/${id}`]);
  }

  deleteRoom(room){
    this.roomService.deleteRoom(room?.id).subscribe({
      next: (res) => {
        this.loadProfile(this.profileId);
      }
    });
  }

  editRoom(room) {
    const modalRef = this.modalService.open(CreateRoomComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((response) => {
      this.gotoRoom(room.id);
    })
    modalRef.componentInstance.topic = room?.topic?.name;
    modalRef.componentInstance.description = room?.description;;
    modalRef.componentInstance.name = room?.name;
    modalRef.componentInstance.isEditMode = true;
    modalRef.componentInstance.id = room?.id;
  }
}
