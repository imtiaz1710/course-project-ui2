import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounce } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { CurrentTopicService } from 'src/app/services/current-topic.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isVisibleProfileOptions: boolean = false;
  isLogin: boolean;
  isSearchEnable: boolean = false;
  searchText: string = '';

  constructor(public authService: AuthService, private router: Router, public currentTopicService: CurrentTopicService,
    private commonService: CommonService) {}

  ngOnInit(): void {
    //this.isLogin = this.authService.isAuthenticated();
    this.currentTopicService.currentTopic$.subscribe({
      next: (topic) => {
        if (topic === "all") {
          this.isSearchEnable = true;
        }
        else {
          this.isSearchEnable = false;
        }
      }
    });

    this.authService.isLogIn$.subscribe({
      next: (value) => {
        this.isLogin = value;
      }
    })
  }

  toggleProfileOptions() {
    this.isVisibleProfileOptions = !this.isVisibleProfileOptions;
  }

  gotoLoginUserProfile() {
    const userId = localStorage.getItem('profile_id');
    this.router.navigate(['/profile', userId]);
  }

  logIn() {
    this.router.navigate(['/auth']);
  }

  logout() {
    this.authService.logout();
  };

  search(){
    debugger
    this.commonService.allRoomSearchText$.next(this.searchText);
  }
}
