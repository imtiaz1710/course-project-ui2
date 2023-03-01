import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  public selectedTopic: string = 'all';

  constructor(private route: ActivatedRoute, private router: Router){

  }

  topics = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'CSharp' },
    { id: 3, name: 'Django' },
    { id: 3, name: 'JavaScript' },
    { id: 3, name: 'Perl' },
  ];

  selectTopic(topic: string) {
    if(topic === 'all'){
      this.router.navigate(['/']);
    }
    else{
      this.router.navigate(['/topics/' + topic]);
    }
    
    this.selectedTopic = topic;
  }  
}
