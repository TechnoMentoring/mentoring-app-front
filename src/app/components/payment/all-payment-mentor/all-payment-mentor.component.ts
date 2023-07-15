import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/model/Payment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/Request';
import { LoginService } from 'src/app/services/login/login.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RequestService } from 'src/app/services/request/request.service';
import { User } from 'src/app/model/User';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Schedule } from 'src/app/model/Schedule';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-all-payment-mentor',
  templateUrl: './all-payment-mentor.component.html',
  styleUrls: ['./all-payment-mentor.component.css']
})
export class AllPaymentMentorComponent implements OnInit {
  dataSource: MatTableDataSource<Payment> = new MatTableDataSource<Payment>([]);
  displayedColumns: string[] = ['idPayment', 'idRequest', 'amount', 'date', 'hour', 'description', 'status'];

  scheduleData!: Schedule[];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    public loginService: LoginService,
    private requestService: RequestService,
    private paymentService: PaymentService,
    private serviceSchedule: ScheduleService,
  ) { }

  ngOnInit(): void {
    this.getAllPayments();
  }

  //////logica para date y time strings
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

  getAllPayments() {
    const user = this.loginService.getUser();
    const idUser = user.idUser;
    let newPayments: any[] = [];


    this.serviceSchedule.getScheduleByMentor(idUser).subscribe(
      (schedules: Schedule[]) => {
        
        schedules.forEach(schedule => {
          const idScheduleR = schedule.idSchedule;

        this.requestService.getAllRequests().subscribe((requests: Request[]) => {
          console.log("todos las solicitudes", requests);

          this.paymentService.allPayment().subscribe((payments: Payment[]) => {
            console.log("todos los pagos", payments);

            payments.forEach(paymentRequest => {
              const idRequestPayment = paymentRequest.idRequest;
              console.log("un pago", paymentRequest);

              const request = requests.find(request => request.idRequest === idRequestPayment && request.idSchedule === idScheduleR);

              if (request) {
                newPayments.push(paymentRequest);
                console.log("un pago hecho", request);
              }
            });

            this.dataSource.data = newPayments;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Pagos actualizados correctamente',
              showConfirmButton: false,
              timer: 1000
            })
            
          });
        });


      });


      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }




}