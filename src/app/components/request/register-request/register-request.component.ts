import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/Request';
import { LoginService } from 'src/app/services/login/login.service';
import { RequestService } from 'src/app/services/request/request.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.css']
})
export class RegisterRequestComponent implements OnInit {

  newstatus?:any;
  noDataMessage: string = '';
  requestForm: FormGroup;

  constructor(
    private scheduleService:ScheduleService,
    private requestService: RequestService,
    public loginService:LoginService,
    private router: Router,
    private formBuilder: FormBuilder,) {
    this.requestForm = this.formBuilder.group({
      title:['', Validators.required],
      description:['', Validators.required],
      date:[],
      hour:[],

    });
    console.log(this.requestService);
  }
  ngOnInit(): void {
    this.obtenerFechaHoraActual();
    this.obtenerHoraActual();
    this.obtenerFechaActual();
  }

  createRequest(): void {

    const idSch = this.scheduleService.selectedScheduleRequest?.idSchedule?? 0;;
    const selectUser = this.loginService.getUser();
    const idUs = selectUser ? selectUser.idUser : null;
    console.log('horarioid',idSch)
    console.log(this.requestForm.valid);
    console.log('Enviando formulario');
    if (this.requestForm.valid) {
      const {  status, description, title,date,hour} = this.requestForm.value;
      const requestData: any = {
        status: 'En proceso',
        idUser: idUs,
        idSchedule: idSch,
        description: description,
        title: title,
        hour: this.horaActual,
        date: this.fechaActual,

      };



      console.log('Datos del solicitud:', requestData);
      this.requestService.createRequest(requestData).subscribe(
        (newRequest: Request) => {
          console.log('Nuevo solicitud creado:', newRequest);
          this.requestForm.reset();

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se envio correctamente tu solicitud',
            showConfirmButton: false,
            timer: 1000
          })

          this.goBack()

        },
        (error) => {  
          console.log('Error al crear el solicitud:', error);
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error en la solicitud',
            showConfirmButton: false,
            timer: 1000
          })
        }
      );
    }
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
    this.fechaActual = año + '-' + mes + '-' + dia+'T'+this.horaActual;
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
