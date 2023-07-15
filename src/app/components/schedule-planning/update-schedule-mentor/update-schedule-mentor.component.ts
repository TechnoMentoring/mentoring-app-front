import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from 'src/app/model/Schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { SelectScheduleComponent } from '../select-schedule/select-schedule.component';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-schedule-mentor',
  templateUrl: './update-schedule-mentor.component.html',
  styleUrls: ['./update-schedule-mentor.component.css']
})
export class UpdateScheduleMentorComponent implements OnInit {

  scheduleSelect:any;
  

  noDataMessage: string = '';

  scheduleForm: FormGroup;

  constructor(
    private router:Router,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    public loginService:LoginService) {
    this.scheduleForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      hourStart: ['', Validators.required],
      
      hourEnd: ['', Validators.required],
      state: [],
    });
    console.log(this.scheduleService);  
  }
  ngOnInit(): void {
    this.scheduleSelect = this.scheduleService.selectedScheduleUpdate;
    this.scheduleSelect.hourStart =  this.convertirHora(this.scheduleSelect.hourStart)
    this.scheduleSelect.hourEnd = this.convertirHora(this.scheduleSelect.hourEnd)
    console.log('horario s',this.scheduleSelect)

  }

  user!:User;

  createSchedule(): void {
    this.user = this.loginService.getUser();
    const idUser = this.user.idUser;
    const idSc = this.scheduleSelect.idSchedule;
    const newstate = this.scheduleSelect.state;
    console.log(this.scheduleForm.valid);
    console.log('Enviando formulario');


    
    if (this.scheduleForm.valid) {

      const { title, date, hourStart, hourEnd} = this.scheduleForm.value;

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
        idSchedule : idSc,
        title: title,
        date: new Date(date).toISOString().substring(0, 10),
        hourStart: this.formatHour(hourStart),
        hourEnd:this.formatHour(hourEnd),
        state: newstate,
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
      this.scheduleService.updateSchedule(scheduleData,idSc).subscribe(
        (newSchedule: Schedule) => {
          console.log('Nuevo horario creado:', newSchedule);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Horario actualizado correctamente',
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

  public formatHour(hour: string): string {
    const [hourPart, meridianPart] = hour.split(' ');
    const [hourValue, minuteValue] = hourPart.split(':');
  
    // Convertir a formato de 24 horas
    let formattedHour = parseInt(hourValue, 10);
    if (meridianPart.toLowerCase() === 'pm' && formattedHour < 12) {
      formattedHour += 12;
    } else if (meridianPart.toLowerCase() === 'am' && formattedHour === 12) {
      formattedHour = 0;
    }
  
    return `${formattedHour.toString().padStart(2, '0')}:${minuteValue.padStart(2, '0')}`;
  }
  


  public convertirHora(hora:any) {
    var partesHora = hora.split(":");
    var horas = parseInt(partesHora[0], 10);
    var minutos = partesHora[1];
  
    var esPM = horas >= 12;
  
    if (horas > 12) {
      horas -= 12;
    }
  
    var hora12 = horas + ":" + minutos + " " + (esPM ? "PM" : "AM");
  
    return hora12;
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

