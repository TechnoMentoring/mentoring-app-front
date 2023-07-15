import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Schedule } from 'src/app/model/Schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-find-all-schedule',
  templateUrl: './find-all-schedule.component.html',
  styleUrls: ['./find-all-schedule.component.css']
})
export class FindAllScheduleComponent implements OnInit {
  dataSource: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>([]);
  displayedColumns: string[] = ['idSchedule', 'title', 'date','hourStart','hourEnd','state','acciones'];
  

constructor(
  private serviceSchedule: ScheduleService,
  private datePipe: DatePipe,
  public loginService: LoginService,
  private router  : Router){}

  ngOnInit(): void {

      this.getSchedulesById();
        // Otra lógica o acción por defecto
  }
  

    formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate ? formattedDate : '';
  }

  getFormattedTime(time: string): string {
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    return `${formattedHours}:${formattedMinutes}`;
  }



  getSchedulesById(): void {
    const id = this.serviceSchedule.idRequetMentor;
    console.log("id solicitado", id);
  
    this.serviceSchedule.getScheduleByMentorStudent(id).subscribe(
      (data: Schedule[]) => {
        console.log('data ', data);
        this.dataSource.data = data;
        console.log('datasouce',this.dataSource.data)
        // Realiza cualquier operación adicional con los datos obtenidos
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }




  realizarAccion(schedule: Schedule) {
    this.router.navigateByUrl('/request/register');
    this.serviceSchedule.selectedScheduleRequest = schedule;
    console.log('Botón clickeado:', schedule);
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
