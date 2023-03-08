import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.css']
})
export class RecentActivitiesComponent implements OnInit {
  activities: any[] = [];

  constructor(private commonService: CommonService){
  }
  ngOnInit(): void {
    this.getRecentActivities();
  }

  getRecentActivities(){
    this.commonService.getRecentActivities().subscribe({
      next: (a: {data: any[], status}) => {
        this.activities = a.data;
        debugger
      },
      error: err => console.log(err)
    })
  }
}
