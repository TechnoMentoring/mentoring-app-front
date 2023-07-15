import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from 'src/app/model/Payment';
import { LoginService } from 'src/app/services/login/login.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/model/Request';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Schedule } from 'src/app/model/Schedule';
import { User } from 'src/app/model/User';
import { A } from '@fullcalendar/core/internal-common';
import { Mentor } from 'src/app/model/Mentor';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// ...


@Component({
  selector: 'app-register-payment',
  templateUrl: './register-payment.component.html',
  styleUrls: ['./register-payment.component.css']
})
export class RegisterPaymentComponent implements OnInit {

  noDataMessage: string = '';
  req!: any;
  idRequest: any;
  paymentForm: FormGroup;



  constructor(
    private router:Router,
    private scheduleService: ScheduleService,
    private paymentService: PaymentService,
    private requestService: RequestService,
    public loginService: LoginService,
    private formBuilder: FormBuilder,) {
    this.paymentForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: [],
      codPayment: ['', Validators.required],
      date: [],
      hour: [],

    });
    console.log(this.paymentService);
  }
  ngOnInit(): void {
    this.obtenerFechaHoraActual();
    this.obtenerHoraActual();
    this.obtenerFechaActual();
  }

  createPayment(): void {
    Swal.fire({
      title: '¿Desea realizar pago?',
      text: "Esta accion no se puede revertir",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'si, porfavor'
    }).then((result) => {
      if (result.isConfirmed) {



    this.req = this.requestService.PaymentRequest
    this.idRequest = this.req.idRequest;
    console.log(this.paymentForm.valid);
    console.log('Enviando formulario');
    this.updateStatus(this.req);
    this.updateSchedule(this.req)
    console.log('Request update ', this.req)
    console.log('id Request update ', this.idRequest)
    const { amount, description, codPayment } = this.paymentForm.value;
    const paymentData: any = {
      status: 'Agregado',
      date: this.fechaActual,
      amount: amount,
      description: description,
      codPayment: codPayment,
      hour: this.horaActual,
      idRequest: this.idRequest,
    };
    console.log('Datos del pago:', paymentData);
    this.paymentService.createPayment(paymentData).subscribe(
      (newPayment: Payment) => {

        console.log('Nuevo pago creado:', newPayment);
        Swal.fire(
          'Pago realizado con exito',
          '',
          'success'
        )
        this.paymentForm.reset();
        this.goBack();

      },
      (error) => {
        console.log('Error crear el pago:', error);
      }
    );
      }
    })
  }


  ////actualizacion de estado de pago en requesst


  updateStatus(element: any) {
    const idRequest = element.idRequest;
    const user = this.loginService.getUser();
    const iduser = user.idUser;
    // Verificar si idUser es válido
    if (iduser) {
      const requestData = {
        idUser: iduser,
        idSchedule: element.idSchedule,
        title: element.title,
        date: element.date,
        hour: element.hour,
        description: element.description,
        status: 'Pagado',
      };

      console.log("requestData ", requestData);

      this.requestService.updateRequest(requestData, idRequest).subscribe(
        (updatedRequest: any) => {
          // Handle the response of the update if needed
          console.log('Solicitud actualizada:', updatedRequest);
        },
        (error: any) => {
          // Handle the error if it occurs
          console.error('Error al actualizar la solicitud:', error);
        }
      );
    } else {
      console.error('El idUser es indefinido');
    }
  }


  ///////////////actuallizacion de horario


  updateSchedule(element: any) {
    const idSchedule = element.idSchedule;
    let newSchedule: any;
    let userM: any;
    let idMentor: any;
  
    forkJoin([
      this.scheduleService.getMentorSchedule(idSchedule),
      this.scheduleService.getSchedule(idSchedule)
    ]).subscribe(([mentor, schedule]) => {
      userM = mentor;
      idMentor = mentor.idUser;
      console.log('mentor extraido', mentor);
  
      schedule.state = 'Ocupado';
      schedule.idUser = idMentor;
      console.log('idMentor', idMentor);
      newSchedule = schedule;
      console.log('objeto schedule extraido ', newSchedule);
  
      console.log('datos del nuevo horario ', newSchedule);
      console.log('id del nuevo horario ', idSchedule);
  
      this.scheduleService.updateSchedule(newSchedule, idSchedule).subscribe(
        (newSchedule: Schedule) => {
          console.log('Nuevo horario creado:', newSchedule);
        },
        (error) => {
          console.log('Error al crear el horario:', error);
        }
      );
    });
  }
  



  ////////////////////////////////////////FECHA HORA

  fechaHoraActual!: Date;
  horaActual!: string;
  fechaActual!: string;


  obtenerFechaHoraActual() {
    this.fechaHoraActual = new Date();
  }

  obtenerHoraActual() {
    const horas = this.fechaHoraActual.getHours();
    const minutos = this.fechaHoraActual.getMinutes();

    // Formatear la hora con el formato "HH:mm"
    this.horaActual = this.formatoDosDigitos(horas) + ':' + this.formatoDosDigitos(minutos);
  }

  obtenerFechaActual() {
    const año = this.fechaHoraActual.getFullYear();
    const mes = this.formatoDosDigitos(this.fechaHoraActual.getMonth() + 1); // Los meses en JavaScript comienzan desde 0
    const dia = this.formatoDosDigitos(this.fechaHoraActual.getDate());

    // Formatear la fecha con el formato "YYYY-MM-DD"
    this.fechaActual = año + '-' + mes + '-' + dia;
  }

  formatoDosDigitos(numero: number) {
    return numero < 10 ? '0' + numero : numero.toString();
  }
  //////////////////////////////////////


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