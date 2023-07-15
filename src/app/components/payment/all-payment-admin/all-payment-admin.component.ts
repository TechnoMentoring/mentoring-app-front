import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Schedule } from '@syncfusion/ej2-angular-schedule';
import { Payment } from 'src/app/model/Payment';
import { Request } from 'src/app/model/Request';
import { LoginService } from 'src/app/services/login/login.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RequestService } from 'src/app/services/request/request.service';


@Component({
  selector: 'app-all-payment-admin',
  templateUrl: './all-payment-admin.component.html',
  styleUrls: ['./all-payment-admin.component.css']
})
export class AllPaymentAdminComponent implements OnInit {
  dataSource: MatTableDataSource<Payment> = new MatTableDataSource<Payment>([]);
  displayedColumns: string[] = ['idSchedule', 'title', 'date', 'hourStart', 'hourEnd', 'state', 'description'];

  scheduleData!: Schedule[];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    public loginService: LoginService,
    private requestService: RequestService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {

    this.getAllPayments()
    // Otra lógica o acción por defecto
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
    const iduser = user.idUser;
      this.paymentService.allPayment().subscribe((payments: Payment[]) => {
        console.log("todos los pagos", payments);
        this.dataSource.data = payments;
      });
  }
  




}
