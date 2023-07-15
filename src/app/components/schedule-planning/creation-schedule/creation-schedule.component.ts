import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Schedule } from 'src/app/model/Schedule';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-schedule',
  templateUrl: './creation-schedule.component.html',
  styleUrls: ['./creation-schedule.component.css'],

})
export class CreationScheduleComponent implements OnInit {
  user:any;

  noDataMessage: string = '';

  scheduleForm: FormGroup;

  constructor(
    private router :Router,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    public loginService:LoginService
    
    ) {

    this.user = this.loginService.getUser()
    let idUser = this.user.idUser;
    this.scheduleForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      hourStart: ['', Validators.required],
      hourEnd: ['', Validators.required],
      state: [],
      idUser:idUser,
    });
    console.log(this.scheduleService);
  }


  ngOnInit(): void {
  }


  createSchedule(): void {
    console.log(this.scheduleForm.valid);
    console.log('Enviando formulario');
    
    if (this.scheduleForm.valid) {
      const { title, date, hourStart, hourEnd, idUser } = this.scheduleForm.value;
      
      const currentDate = new Date(); // Obtener la fecha actual
      const selectedDate = new Date(date); // Obtener la fecha seleccionada
      
      // Comparar las fechas
      if (selectedDate <= currentDate) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha ingresada debe ser mayor a la fecha actual'
        });
        return; // Salir del método si la fecha no es válida
      }
      
      const scheduleData: any = {
        title: title,
        date: selectedDate.toISOString().substring(0, 10),
        hourStart: this.formatHour(hourStart),
        hourEnd: this.formatHour(hourEnd),
        state: 'Disponible',
        idUser: idUser,
      };
  
      const formattedHourStart = this.formatHour(hourStart);
      const formattedHourEnd = this.formatHour(hourEnd);
        
      if (formattedHourStart >= formattedHourEnd) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La hora de inicio no puede ser mayor o igual que la hora de fin'
        });
        return; // Salir del método si las horas no son válidas
      } 
  
      console.log('Datos del horario:', scheduleData);
      this.scheduleService.createSchedule(scheduleData).subscribe(
        (newSchedule: Schedule) => {
          console.log('Nuevo horario creado:', newSchedule);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Horario creado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.scheduleForm.reset();
          this.goBack();
        },
        (error) => {  
          console.log('Error al crear el horario:', error);
        }
      );
    }
  }
  


  private formatHour(hour: string): string {
    const [hourPart, meridianPart] = hour.split(' ');
    const [hourValue, minuteValue] = hourPart.split(':');
  
    let formattedHour = parseInt(hourValue, 10);
    if (meridianPart.toLowerCase() === 'pm' && formattedHour < 12) {
      formattedHour += 12;
    } else if (meridianPart.toLowerCase() === 'am' && formattedHour === 12) {
      formattedHour = 0;
    }
  
    return `${formattedHour.toString().padStart(2, '0')}:${minuteValue.padStart(2, '0')}`;
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

