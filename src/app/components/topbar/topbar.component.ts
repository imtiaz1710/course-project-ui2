import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  profileIcon: boolean = false;

  toggleProfileIcon(){
    this.profileIcon =!this.profileIcon;
  }
}
