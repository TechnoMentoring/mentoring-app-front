import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from 'src/app/model/Schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { SelectScheduleComponent } from '../select-schedule/select-schedule.component';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css']
})
export class UpdateScheduleComponent  implements OnInit {
  

  noDataMessage: string = '';

  scheduleForm: FormGroup;

  constructor(

    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private loginService:LoginService) {
    this.scheduleForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      hourStart: ['', Validators.required],
      hourEnd: ['', Validators.required],
      description: ['', Validators.required],
      state: [],
    });
    console.log(this.scheduleService);  
  }
  ngOnInit(): void {
  }

  user!:User;

  createSchedule(): void {
    this.user = this.loginService.getUser();
    const idUser = this.user.idUser;
    
    const idSc = this.scheduleService.selectedScheduleUpdate?.idSchedule?? 0;
    console.log(this.scheduleForm.valid);
    console.log('Enviando formulario');
    if (this.scheduleForm.valid) {
      const { title, date, hourStart, hourEnd, description, state } = this.scheduleForm.value;
      const scheduleData: any = {
        idSchedule : idSc,
        title: title,
        date: new Date(date).toISOString().substring(0, 10),
        hourStart: this.formatHour(hourStart),
        hourEnd: this.formatHour(hourEnd),
        description: description,
        state: state,
        idUser: idUser
      };

      const formattedHourStart = this.formatHour(hourStart);
      const formattedHourEnd = this.formatHour(hourEnd);
      
      if (formattedHourStart >= formattedHourEnd) {
        this.noDataMessage = "La hora de inicio no puede ser mayor o igual que la hora de fin";
        setTimeout(() => {
            this.noDataMessage = "";
        }, 3000);
    } 

      console.log('Datos del horario:', scheduleData);
      this.scheduleService.updateSchedule(scheduleData,idSc).subscribe(
        (newSchedule: Schedule) => {
          console.log('Nuevo horario creado:', newSchedule);
          this.scheduleForm.reset();
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
  
    // Convertir a formato de 24 horas
    let formattedHour = parseInt(hourValue, 10);
    if (meridianPart.toLowerCase() === 'pm' && formattedHour < 12) {
      formattedHour += 12;
    } else if (meridianPart.toLowerCase() === 'am' && formattedHour === 12) {
      formattedHour = 0;
    }
  
    return `${formattedHour.toString().padStart(2, '0')}:${minuteValue.padStart(2, '0')}`;
  }
  
  
  


}

