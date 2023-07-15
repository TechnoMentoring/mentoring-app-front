import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Request } from 'src/app/model/Request';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.css']
})
export class AllRequestComponent implements OnInit {


  dataSource: MatTableDataSource<Request> = new MatTableDataSource<Request>([]);
  displayedColumns: string[] = ['idRequest', 'idSchedule', 'idStudent','title','date','hour','description','status'];

  constructor(
    private requestService : RequestService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.getAllRequests();
    console.log("llamando a todos las solicitudes")
  }


  getAllRequests(): void {
  
    this.requestService.getAllRequests().subscribe((requests: Request[]) => 
    {
      console.log(requests)
      this.dataSource.data = requests;
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
