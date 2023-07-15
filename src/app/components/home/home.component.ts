import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor
(
  private userService: UserService,
  public  loginService :LoginService,

){  
  
  }
}
