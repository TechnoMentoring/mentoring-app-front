import { Component, OnInit } from '@angular/core';
import {NgIf, NgFor, DatePipe} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Schedule } from 'src/app/model/Schedule';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-select-schedule',
  templateUrl: './select-schedule.component.html',
  styleUrls: ['./select-schedule.component.css'],
  
})
export class SelectScheduleComponent implements OnInit {

  dataSource: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>([]);
  select: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>;
  displayedColumns: string[] = ['idSchedule','idUser', 'title', 'date','hourStart','hourEnd','state'];
  displayedColumns2: string[] = ['idSchedule', 'title'];
  

  constructor(  private serviceSchedule: ScheduleService, 
    private datePipe: DatePipe,
    public loginService:LoginService
    ) { }

  ngOnInit() {
    this.getAllSchedules()
  }

  getAllSchedules(): void {
  
    this.serviceSchedule.getAllSchedules().subscribe((schedules: Schedule[]) => 
    {
      console.log(schedules)
      this.dataSource.data = schedules;
    });
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


  realizarAccion(schedule: Schedule) {
      this.serviceSchedule.selectedScheduleUpdate = schedule;
      this.select.data = [schedule];
      this.errorMessageShown = true;
      console.log("  select data  " , this.select.data)
      console.log('Horario seleccionado:', schedule);
  }

  errorMessageShown: boolean = false;


msjerror(): void {
  if (!this.errorMessageShown) {

    console.log("no se selecciono")
    alert('No se ha seleccionado ningún horario. Por favor, elija un curso.');
  }
}


  hasSelectedSchedule(): boolean {
    return this.select.data.length > 0;
  }
}
