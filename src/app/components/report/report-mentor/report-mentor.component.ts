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
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report-mentor',
  templateUrl: './report-mentor.component.html',
  styleUrls: ['./report-mentor.component.css']
})
export class ReportMentorComponent implements OnInit {
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


  generatePDF() {
    Swal.fire({
      title: '¿Desea descargar pdf?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'si, porfavor'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'PDF realizado con exito',
          '',
          'success'
        )


        const user = this.loginService.getUser();

        let ganancia = 0;

        this.dataSource.data.forEach(payment => {
          const amount = Number(payment.amount);
          const gananciaPayment = amount * 0.1;
          ganancia += gananciaPayment;
        });

        const total = this.dataSource.data.reduce((sum, payment) => sum + Number(payment.amount), 0);
        ganancia = parseFloat(ganancia.toFixed(2));

        console.log('total', total);
        console.log('ganancia', ganancia);



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
              text: 'Información del cliente',
              bold: true,
              fontSize: 15,
            },
            {
              text: '  ',
            },
            {
              columns: [
                {
                  text: 'Nombre del cliente:  ' + user.username,
                  fontSize: 11,

                },
              ]

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
                    { text: payment.status, style: 'tableRow' },
                    { text: payment.amount.toString(), style: 'tableRow' },
                  ])
                ],
                alignment: 'right',
                headerRows: 1,
              }

            },
            {
              text: `Total: $${total}`,
              style: 'total'
            },
            {
              text: `solo el 10 %`,
              style: 'total'
            },
            {
              text: `Ganancias: $${ganancia}`,
              style: 'total'
            }
          ],
          styles: styles
        };

        pdfMake.createPdf(documentDefinition).open();
      }
    })

  }


}