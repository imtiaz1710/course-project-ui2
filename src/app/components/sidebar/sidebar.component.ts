import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentTopicService } from 'src/app/services/current-topic.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit  {
  public selectedTopic: string = 'all';

  constructor(private route: ActivatedRoute, private router: Router, private currentTopicService: CurrentTopicService){
  }

  ngOnInit(): void {
    this.currentTopicService.currentTopic$.subscribe({
      next: topic => {
        this.selectedTopic = topic;
      }
    })
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
      //this.router.navigate(['/topics/' + topic]);
      this.router.navigate(['/topics', topic]);
    }
    
    this.selectedTopic = topic;
  }  
}
