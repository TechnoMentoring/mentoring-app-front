import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Schedule } from 'src/app/model/Schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/model/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-find-schedule-mentor',
  templateUrl: './find-schedule-mentor.component.html',
  styleUrls: ['./find-schedule-mentor.component.css']
})
export class FindScheduleMentorComponent implements OnInit {
  dataSource: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>([]);
  displayedColumns: string[] = ['idSchedule', 'title', 'date','hourStart','hourEnd','state','description'];

  scheduleData!: Schedule[];

constructor(
  private serviceSchedule: ScheduleService,
  private datePipe: DatePipe,
  private router  : Router,
  public loginService: LoginService,
  ){}

  ngOnInit(): void {
    this.getSchedulesById();
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
  
  

    user!:User;

  getSchedulesById(){
    this.user = this.loginService.getUser();
   const idUser = this.user.idUser;
    this.serviceSchedule.getScheduleByMentor(idUser).subscribe(
      (data: Schedule[]) => {
        console.log('data ', data);
        this.dataSource.data = data;
        console.log('datasouce',this.dataSource.data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Horarios actualizados correctamente',
          showConfirmButton: false,
          timer: 1000
        })
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
}



  realizarAccion(element: any) {
    this.router.navigateByUrl('/request/register');
    this.serviceSchedule
    console.log('Botón clickeado:', element);
  }
  
}
