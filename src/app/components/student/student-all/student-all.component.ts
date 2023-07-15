import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { RequestService } from 'src/app/services/request/request.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { UserService } from 'src/app/services/user/user.service';
import { Request } from 'src/app/model/Request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-all',
  templateUrl: './student-all.component.html',
  styleUrls: ['./student-all.component.css']
})
export class StudentAllComponent implements OnInit {


  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private requestService: RequestService,
    public loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllStudents();
  }






  getAllStudents() {
    let users: User[] =[] ;
    const user = this.loginService.getUser();
    const iduser = user.idUser;
    this.scheduleService.getRequestsMentor(iduser).subscribe((requests: Request[]) => {
      console.log(requests);

      requests.forEach(requestSchedule => {
        const idRequest = requestSchedule.idRequest;

      this.requestService.getUserRequest(idRequest).subscribe((user: User) => {
        users.push(user);
        })
        });

        this.dataSource.data = users;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Estudiantes actualizados correctamente',
          showConfirmButton: false,
          timer: 1000
        })

      },
        (error: any) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    }



}
