import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {


  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public  loginService :LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }


  getAllUsers(): void {
  
    this.userService.getAllUsers().subscribe((users: User[]) => 
    {
      console.log(users)
      this.dataSource.data = users;
      console.log('data tabla ',this.dataSource.data)

    });
  }

}
