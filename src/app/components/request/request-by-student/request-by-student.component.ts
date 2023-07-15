import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Payment } from 'src/app/model/Payment';
import { Request } from 'src/app/model/Request';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RequestService } from 'src/app/services/request/request.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-request-by-student',
  templateUrl: './request-by-student.component.html',
  styleUrls: ['./request-by-student.component.css']
})
export class RequestByStudentComponent implements OnInit {


  @ViewChild('payButton') payButton!: MatButton;

  dataSource: MatTableDataSource<Request> = new MatTableDataSource<Request>([]);
  Pagados: MatTableDataSource<Request> = new MatTableDataSource<Request>([]);
  displayedColumns: string[] = ['idRequest', 'title', 'date', 'hour', 'description', 'status', 'acciones'];



  constructor(
    private requestService: RequestService,
    private datePipe: DatePipe,
    private router: Router,
    private scheduleService: ScheduleService,
    public loginService: LoginService,
    private paymentService: PaymentService,
  ) { }

  ngOnInit() {
    this.getAllRequests();
    this.getAllPayments();
    console.log("llamando a todos las solicitudes");
  }

  getAllRequests(): void {
    const user = this.loginService.getUser();
    const iduser = user.idUser;
    this.requestService.getUserRequests(iduser).subscribe((requests: Request[]) => {
      console.log(requests);

      this.dataSource.data = requests;
      console.log('data tabla ', this.dataSource.data);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Solicitudes actualizadas correctamente',
        showConfirmButton: false,
        timer: 1000
      })

    });
  }


  getAllPayments() {
    const user = this.loginService.getUser();
    const iduser = user.idUser;
  
    this.requestService.getUserRequests(iduser).subscribe((requests: Request[]) => {
      this.dataSource.data = requests;
  
      this.paymentService.allPayment().subscribe((payments: Payment[]) => {
        const paidRequestIds = payments.map(payment => payment.idRequest);
  
        this.dataSource.data.forEach(request => {
          request.isPaid = paidRequestIds.includes(request.idRequest);
        });
  
        this.dataSource.data = [...this.dataSource.data]; 
      });
    });
  }
  



  formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      return formattedDate ? formattedDate : '';
    }

    return this.datePipe.transform(date.toISOString(), 'dd/MM/yyyy') || '';
  }


  getFormattedTime(time: string | Date): string {
    if (typeof time === 'string') {
      if (!time) {
        return '';
      }

      const parts = time.split(':');
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
      return `${formattedHours}:${formattedMinutes}`;
    }

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    return `${formattedHours}:${formattedMinutes}`;
  }


  errorMessageShown: boolean = false;

  msjerror(): void {
    if (!this.errorMessageShown) {
      console.log("no se selecciono");
      alert('No se ha seleccionado ningún horario. Por favor, elija un curso.');
    }
  }


  realizarAccion(request: Request) {
    this.router.navigateByUrl('/payment/register');
    this.requestService.PaymentRequest = request;
    console.log('Botón clickeado:', request);
  }



  

}
