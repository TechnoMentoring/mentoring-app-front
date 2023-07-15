import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { RequestService } from 'src/app/services/request/request.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Request } from 'src/app/model/Request';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Payment } from 'src/app/model/Payment';
import { Schedule } from 'src/app/model/Schedule';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-request-by-mentor',
  templateUrl: './request-by-mentor.component.html',
  styleUrls: ['./request-by-mentor.component.css']
})
export class RequestByMentorComponent implements OnInit {
  select: MatTableDataSource<Request> = new MatTableDataSource<Request>([]);
  dataSource: MatTableDataSource<Request> = new MatTableDataSource<Request>([]);
  dataReprogramer: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>([]);
  displayedColumns: string[] = ['idRequest', 'title', 'date', 'hour', 'description', 'status'];
  displayedColumns2: string[] = ['idRequest', 'title'];

  constructor(
    private paymentService: PaymentService,
    private requestService: RequestService,
    private datePipe: DatePipe,
    private scheduleService: ScheduleService,
    public loginService: LoginService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.getAllPayments(),
    this.getAllRequests(),

    console.log("llamando a todas las solicitudes");
  }

  getAllRequests(): void {
    const user = this.loginService.getUser();
    const iduser = user.idUser;
    this.scheduleService.getRequestsMentor(iduser).subscribe((requests: Request[]) => {
      console.log(requests);
      this.dataSource.data = requests;
      console.log('data tabla ', this.dataSource.data);


      ///////actualiza datos de los ids
      requests.forEach(request => {
        const idRequest = request.idRequest;
        this.obtenerUserByRequest(idRequest);
      });


    });
  }


  
  getAllPayments() {
    const user = this.loginService.getUser();
    const iduser = user.idUser;
  
    this.scheduleService.getRequestsMentor(iduser).subscribe((requests: Request[]) => {
      this.dataSource.data = requests;
  
      this.paymentService.allPayment().subscribe((payments: Payment[]) => {
        const paidRequestIds = payments.map(payment => payment.idRequest);
  
        this.dataSource.data.forEach(request => {
          request.isPaid = paidRequestIds.includes(request.idRequest);
        });
  
        this.dataSource.data = [...this.dataSource.data]; 

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Solicitudes actualizadas correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      });
    });
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
  
  


  ///////resultados de las consultas de obtener usuarios  estudiantes
   results: { idRequest: number, idStudent: number }[] = [];
  
  obtenerUserByRequest(id: any): void {
    this.requestService.getUserRequest(id)
      .subscribe(user => {
        this.requestService.userin = user;
        const idRequest = id;
        const idStudent = user.idUser;
    
        this.results.push({ idRequest, idStudent });
      });
  }


  updateStatus(element: any) {
    const idRequest = element.idRequest;
    const result = this.results.find(result => result.idRequest === idRequest);
    const idStudentR = result?.idStudent
    console.log("login", this.requestService.userin);
    // Verificar si idUser es válido
    if (idStudentR) {
      const requestData = {
        idUser: idStudentR,
        idSchedule: element.idSchedule,
        title: element.title,
        date: element.date,
        hour: element.hour,
        description: element.description,
        status: element.status,
      };
  
      console.log("requestData ", requestData);
  
      this.requestService.updateRequest(requestData, idRequest).subscribe(
        (updatedRequest: any) => {
          console.log('Solicitud actualizada:', updatedRequest);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Solicitud actualizada',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error: any) => {
          console.error('Error al actualizar la solicitud:', error);
        }
      );
    } else {
      console.error('El idUser es indefinido');
    }
  }
  

  errorMessageShown: boolean = false;

  msjerror(): void {
    if (!this.errorMessageShown) {
      console.log("no se seleccionó");
      alert('No se ha seleccionado ningún horario. Por favor, elija un curso.');
    }
  }

  hasSelectedSchedule(): boolean {
    return this.select.data.length > 0;
  }


  realizarAccion(idSchedule:any){
    this.scheduleService.getSchedule(idSchedule).subscribe((schedule: Schedule) => {
      console.log('schedule selecionado ' , schedule)
    this.scheduleService.selectedScheduleUpdateReprogram = schedule;
    console.log('Horario seleccionado reprogramacion:', schedule);
    if(schedule){
      this.router.navigateByUrl('/schedule/reprogramerMentor')
        }
  });

  }
}
