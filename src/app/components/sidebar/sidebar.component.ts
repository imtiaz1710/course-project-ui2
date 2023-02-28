import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  public selectedTopic: string = 'all';

  topics = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'CSharp' },
    { id: 3, name: 'Django' },
    { id: 3, name: 'JavaScript' },
    { id: 3, name: 'Perl' },
  ];

  selectTopic(topic: string) {
    this.selectedTopic = topic;
  }  
}
