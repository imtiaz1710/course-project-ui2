import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.css']
})
export class RecentActivitiesComponent implements OnInit {
  activities: any[] = [];

  constructor(private commonService: CommonService, private router: Router){
  }
  ngOnInit(): void {
    this.getRecentActivities();
  }

  getRecentActivities(){
    this.commonService.getRecentActivities().subscribe({
      next: (a: {data: any[], status}) => {
        debugger
        this.activities = a.data;
      },
      error: err => console.log(err)
    })
  }

  gotoProfile(id: string) {
    this.router.navigate(['/profile', id]);
  }

  gotoRoom(room: any){
    this.router.navigate([`/topics/${room.topic}/${room.id}`]);
  }
}
