import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Schedule } from 'src/app/model/Schedule';
import { Subject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from 'src/app/model/User';
import { Request } from 'src/app/model/Request';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  selectedScheduleUpdate!: Schedule;
  selectedScheduleUpdateReprogram!: Schedule;
  idRequetMentor!: number;
  accionIdMentor: any;
  actionType: string = '';
  selectedScheduleRequest!: Schedule;


  private url = 'http://localhost:8080/user/schedule';

  constructor(private http : HttpClient,
    private loginService:LoginService){} 

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.url}/readall`).pipe(
      map(response => response as Schedule[])
    );
  }

  createSchedule(scheduleData: any): Observable<Schedule> {
    console.log('Datos del horario:', scheduleData);

    return this.http.post<Schedule>(`${this.url}/create`, scheduleData).pipe(
      catchError((error: any) => {
        console.log('Error al crear el horario:', error);
        return throwError('Error en la solicitud de creación de horario');
      })
    );
  }
  
  updateSchedule(scheduleData:any,idSchedule: number): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.url}/update/${idSchedule}`, scheduleData);
  }


getScheduleByMentor(idMentor: any): Observable<Schedule[]> {
  return this.http.get<Schedule[]>(`${this.url}/get/${idMentor}`);
}

getScheduleByMentorStudent(idRequetMentor: any): Observable<Schedule[]> {
  return this.http.get<Schedule[]>(`${this.url}/get/${idRequetMentor}`);
}



getMentorSchedule(idSchedule: any): Observable<User> {
  return this.http.get<User>(`${this.url}/getSchedule-Mentor/${idSchedule}`).pipe(
    map(response => response as User)
  );
}

getRequestsMentor(id: User): Observable<Request[]> {
  return this.http.get<Request[]>(`${this.url}/getRequestsMentor/${id}`).pipe(
    map(response => response as Request[])
  );
}


getSchedule(id:any): Observable<Schedule> {
  return this.http.get<Schedule>(`${this.url}/id/${id}`).pipe(
    map(response => response as Schedule)
  );
}

}