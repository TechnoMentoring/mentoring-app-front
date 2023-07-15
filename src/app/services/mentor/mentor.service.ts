import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mentor } from 'src/app/model/Mentor';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private url = 'http://localhost:8080/mentor';

  constructor(private http : HttpClient){} 

  getAllMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(`${this.url}/readall`).pipe(
      map(response => response as Mentor[])
    );
  }
}