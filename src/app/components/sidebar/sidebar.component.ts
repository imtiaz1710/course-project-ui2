import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  topics = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'C#' }
  ];
}
