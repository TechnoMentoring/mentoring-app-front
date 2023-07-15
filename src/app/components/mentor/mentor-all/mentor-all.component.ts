import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mentor } from 'src/app/model/Mentor';
import { MentorService } from 'src/app/services/mentor/mentor.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentor-all',
  templateUrl: './mentor-all.component.html',
  styleUrls: ['./mentor-all.component.css']
})
export class MentorAllComponent implements OnInit,AfterViewInit{
  dataSource: MatTableDataSource<Mentor>;
  dataSourceU: MatTableDataSource<User>;
  displayedColumn: string[] = ['idUser', 'name', 'email','password','dni','acciones'];
  displayedColumns: string[] = ['idUser', 'username', 'name', 'email','dni','acciones'];

  filterForm: FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor
(private mentorService: MentorService,
  private scheduleService: ScheduleService,
  private userService:UserService,
  private formBuilder: FormBuilder,
  private router: Router,
  public loginService:LoginService

){  
  
  this.filterForm = this.formBuilder.group({
  startDate: ['', Validators.required],
  endDate: ['', Validators.required],});
  this.dataSourceU = new MatTableDataSource<User>([]);
  this.dataSource = new MatTableDataSource<Mentor>([]);
  }


ngOnInit(): void {
  this.getUsserByRole();
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


getAllMentors(): void {

  this.mentorService.getAllMentors().subscribe((mentors: Mentor[]) => 
  {
    this.dataSource.data = mentors;
  });
}

realizarAccion(user: User) {
  this.scheduleService.idRequetMentor = user.idUser;
  this.router.navigateByUrl('/schedule/find');
  console.log('Botón clickeado:', user);
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'se selecciono el horairo correctamente',
    showConfirmButton: false,
    timer: 1000
  })
}


getUsserByRole(): void {
  this.userService.getAllUsers().subscribe((users: User[]) => {
    const filteredUsers = users.filter(user => user.roles.some(role => role.name === 'MENTOR'));
    this.dataSourceU.data = filteredUsers;
    console.log('filtrados ', filteredUsers);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'se actualizo correctamente la lista de los mentores',
      showConfirmButton: false,
      timer: 1000
    })
  });
}



goBack(): void {
  if(this.loginService.getUserRole()=='ADMIN'){
    this.router.navigateByUrl('home')
  }else if(this.loginService.getUserRole()=='MENTOR'){
    this.router.navigateByUrl('home')
  }else if(this.loginService.getUserRole()=='STUDENT'){
    this.router.navigateByUrl('home')
  }
}


}
