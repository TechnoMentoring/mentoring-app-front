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
  selector: 'app-update-reprogramer-mentor',
  templateUrl: './update-reprogramer-mentor.component.html',
  styleUrls: ['./update-reprogramer-mentor.component.css']
})
export class UpdateReprogramerMentorComponent implements OnInit {

  scheduleSelected:any;

  noDataMessage: string = '';

  scheduleForm: FormGroup;

  constructor(
    private router: Router,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    public loginService:LoginService) {
    this.scheduleForm = this.formBuilder.group({
      title: [],
      date: ['', Validators.required],
      hourStart: ['', Validators.required],
      hourEnd: ['', Validators.required],
      state: [],
    });
    console.log(this.scheduleService);  
  }
  ngOnInit(): void {
    this.scheduleSelected = this.scheduleService.selectedScheduleUpdateReprogram; 
      this.scheduleSelected.hourStart =  this.convertirHora(this.scheduleSelected.hourStart)
    this.scheduleSelected.hourEnd = this.convertirHora(this.scheduleSelected.hourEnd)
    console.log('horario selecionado reprogramar init',this.scheduleSelected)
  }

  user!:User;

  createSchedule(): void {
    this.user = this.loginService.getUser();
    const idUser = this.user.idUser;
    console.log('seleccion en update', this.scheduleSelected)
    const idSc = this.scheduleSelected.idSchedule;
    const newtitle = this.scheduleSelected.title;
    console.log(this.scheduleForm.valid);
    console.log('Enviando formulario');
    if (this.scheduleForm.valid) {
      const {  hourStart, hourEnd,date} = this.scheduleForm.value;
      const currentDate = new Date(); // Obtener la fecha actual
      const selectedDate = new Date(date); // Obtener la fecha seleccionada
      
      // Comparar las fechas
      if (selectedDate <= currentDate) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha ingresada debe ser mayor a la fecha actual'
        });
        return; 
      }

      const scheduleData: any = {
        idSchedule : idSc,
        title: newtitle,
        date: new Date(date).toISOString().substring(0, 10),
        hourStart: this.formatHour(hourStart),
        hourEnd:this.formatHour(hourEnd),
        state: 'Reprogramado',
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
        return; 
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

