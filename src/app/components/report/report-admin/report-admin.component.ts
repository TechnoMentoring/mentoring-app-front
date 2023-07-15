import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Schedule } from '@syncfusion/ej2-angular-schedule';
import { Payment } from 'src/app/model/Payment';
import { LoginService } from 'src/app/services/login/login.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RequestService } from 'src/app/services/request/request.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit {
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
  




  generatePDF() {
    const user = this.loginService.getUser();
    const total = this.dataSource.data.reduce((sum, payment) => sum + Number(payment.amount), 0);


    const styles: any = {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 20, 0, 10]
      },
      subheader: {
        fontSize: 12,
        alignment: 'center',
        margin: [0, 10, 0, 10]
      },
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: 'black',
        fillColor: '#eaeaea',
        alignment: 'center',
      },
      tableRow: {
        fontSize: 10,
        color: 'black',
        alignment: 'center'
      },
      total: {
        bold: true,
        fontSize: 12,
        alignment: 'right',
        margin: [0, 30, 0, 0]
      }
    };

    const documentDefinition = {
      content: [
        {
          text: 'Reporte de pagos',
          style: 'header'
        },
        {
          text: 'EMPRESA TECNOMENTORING',
          style: 'header'
        },
        {
          text: 'Información de pagos ',
          bold: true,
          fontSize: 15,
        },
        {
          text: '  ',
        },

        {
          table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'ID', style: 'tableHeader' },
                { text: 'ID Solicitud', style: 'tableHeader' },
                { text: 'Fecha', style: 'tableHeader' },
                { text: 'Hora', style: 'tableHeader' },
                { text: 'Descripción', style: 'tableHeader' },
                { text: 'Estado', style: 'tableHeader' },
                { text: 'Monto', style: 'tableHeader' },
              ],
              ...this.dataSource.data.map(payment => [
                { text: payment.idPayment.toString(), style: 'tableRow' },
                { text: payment.idRequest.toString(), style: 'tableRow' },
                { text: payment.date.toString(), style: 'tableRow' },
                { text: payment.hour.toString(), style: 'tableRow' },
                { text: payment.description, style: 'tableRow' },
                { text: payment.status, style: 'tabl<eRow' },
                { text: payment.amount.toString(), style: 'tableRow' },
              ])
            ],
            alignment: 'right', 
            headerRows: 1,
          }
          
        },
        {
          text: `Total de pagos: $${total}`,
          style: 'total'
        }
      ],
      styles: styles
    };

    pdfMake.createPdf(documentDefinition).open();
  }


}
