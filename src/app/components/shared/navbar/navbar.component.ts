import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit{

  isLoggedIn: boolean = false;
  user: any;

  constructor(
    private router:Router,
    private scheduleService: ScheduleService,
    public  loginService:LoginService
    
    ) {}
  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggetIn();
    if (this.isLoggedIn) {
      this.user = this.loginService.getUser();
    }

    window.addEventListener('storage', (event) => {
      if (event.key === 'user') {
        this.user = this.loginService.getUser();
      }
    });
    }

  public logout(){
    this.router.navigateByUrl('login/login/');
    this.loginService.logOut();
    
  }

  
  ngAfterViewInit() {
    this.isLoggedIn = this.loginService.isLoggetIn();
    if (this.isLoggedIn) {
      setTimeout(() => {
        this.user = this.loginService.getUser();
      });
    }
  }


}
