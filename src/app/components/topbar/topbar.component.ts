import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit  {
  isVisibleProfileOptions: boolean = false;
  isLogin: boolean;

  constructor(public authService: AuthService, private router: Router){
  }
  ngOnInit(): void {
    //this.isLogin = this.authService.isAuthenticated();

    this.authService.isLogIn$.subscribe({
      next: (value) => {
        this.isLogin = value;
      }
    })
  }

  toggleProfileOptions(){
    this.isVisibleProfileOptions =!this.isVisibleProfileOptions;
  }

  logIn(){
    this.router.navigate(['/auth']);
  }

  logout(){
    this.authService.logout();
  };
}
