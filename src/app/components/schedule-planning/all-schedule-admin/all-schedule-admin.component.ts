import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Schedule } from 'src/app/model/Schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { DatePipe } from '@angular/common';import { LoginService } from 'src/app/services/login/login.service';
;

@Component({
  selector: 'app-all-schedule-admin',
  templateUrl: './all-schedule-admin.component.html',
  styleUrls: ['./all-schedule-admin.component.css']
})
export class AllScheduleAdminComponent implements OnInit {
  dataSource: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>([]);
  displayedColumns: string[] = ['idSchedule', 'title', 'date','hourStart','hourEnd','state','idMentor'];
  

constructor(
  private serviceSchedule: ScheduleService,
  public loginService: LoginService,
  private datePipe: DatePipe){}

  ngOnInit(): void {
        this.getAllSchedules();
        console.log("llamado a todos los horarios")

  }
  
  
  getAllSchedules(): void {
  
    this.serviceSchedule.getAllSchedules().subscribe((schedules: Schedule[]) => 
    {
      console.log(schedules)
      this.dataSource.data = schedules;
      console.log('data tabla ',this.dataSource.data)

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




  
}
