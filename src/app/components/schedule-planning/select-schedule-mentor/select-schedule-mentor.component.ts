import { Component, OnInit } from '@angular/core';
import {NgIf, NgFor, DatePipe} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Schedule } from 'src/app/model/Schedule';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/model/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-schedule-mentor',
  templateUrl: './select-schedule-mentor.component.html',
  styleUrls: ['./select-schedule-mentor.component.css']
})
export class SelectScheduleMentorComponent implements OnInit {
  dataSource: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>([]);
  select: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>;
  displayedColumns: string[] = ['idSchedule', 'title', 'date','hourStart','hourEnd','state'];
  displayedColumns2: string[] = ['idSchedule', 'title'];
  

  constructor(  private serviceSchedule: ScheduleService, 
    private datePipe: DatePipe,
    public loginService:LoginService
    ) { }

  ngOnInit() {
    this.getSchedulesById()
  }


  
  user!:User;
  
  getSchedulesById(){
    this.user = this.loginService.getUser();
   const idUser = this.user.idUser;
    this.serviceSchedule.getScheduleByMentor(idUser).subscribe(
      (data: Schedule[]) => {
        console.log('data ', data);
        this.dataSource.data = data;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Horarios actualizados correctamente',
          showConfirmButton: false,
          timer: 1000
        })
        console.log('datasouce',this.dataSource.data)
        // Realiza cualquier operación adicional con los datos obtenidos
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
}


  getAllSchedules(): void {
  
    this.serviceSchedule.getAllSchedules().subscribe((schedules: Schedule[]) => 
    {
      console.log(schedules)
      this.dataSource.data = schedules;
    });
  }

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


  realizarAccion(schedule: Schedule) {
      this.serviceSchedule.selectedScheduleUpdate = schedule;
      this.select.data = [schedule];


      console.log("  select data  " , this.select.data)
      console.log('Horario seleccionado:', schedule);
      this.errorMessageShown = true;

  }

  errorMessageShown: boolean = false;


  msjerror(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se seleccionó ningún horario'
    });
  }
  
  showErrorMessage(): void {
    if (!this.errorMessageShown) {
      this.msjerror();
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Horario seleccionado correctamente',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }
  


  hasSelectedSchedule(): boolean {
    return this.select.data.length > 0;
  }
}
