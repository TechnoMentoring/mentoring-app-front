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
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Payment } from 'src/app/model/Payment';
import { Request } from 'src/app/model/Request';
import { RequestService } from 'src/app/services/request/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentor-by-student',
  templateUrl: './mentor-by-student.component.html',
  styleUrls: ['./mentor-by-student.component.css']
})
export class MentorByStudentComponent implements OnInit {
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
  public loginService:LoginService,
  private paymentService: PaymentService,
  private requestService: RequestService,

){  
  
  this.filterForm = this.formBuilder.group({
  startDate: ['', Validators.required],
  endDate: ['', Validators.required],});
  this.dataSourceU = new MatTableDataSource<User>([]);
  this.dataSource = new MatTableDataSource<Mentor>([]);
  }


ngOnInit(): void {
  this.getAllMentors();
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




realizarAccion(user: User) {
  this.scheduleService.idRequetMentor = user.idUser;
  this.router.navigateByUrl('/schedule/find');
  console.log('Botón clickeado:', user);
}




getAllMentors() {
  const user = this.loginService.getUser();
  const iduser = user.idUser;
  let users: any[] = [];

  this.requestService.getUserRequests(iduser).subscribe((requests: Request[]) => {
    console.log("todos las solicitudes", requests);

    this.paymentService.allPayment().subscribe((payments: Payment[]) => {
      console.log("todos los pagos", payments);

      payments.forEach(paymentRequest => {
        const idRequestPayment = paymentRequest.idRequest;
        console.log("un pago", paymentRequest);

        const request = requests.find(request => request.idRequest === idRequestPayment);
        if (request) {
          const idSchedule = request.idSchedule;
          this.scheduleService.getMentorSchedule(idSchedule).subscribe((user: User) => {
            console.log('user extraido ' , user)
            users.push(user);
          });
        }
      });

      this.dataSourceU.data = users;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Mentores actualizados correctamente',
        showConfirmButton: false,
        timer: 1000
      })
      
    });
  });
}

}
