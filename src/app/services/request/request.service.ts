import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from '@syncfusion/ej2-base';
import { Observable, catchError, map } from 'rxjs';
import { Request } from 'src/app/model/Request';
import { User } from 'src/app/model/User';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  userin!:User;
  PaymentRequest!: any;


  updateStatus(element: any, user: any): any {
    throw new Error('Method not implemented.');
  }

  private url = 'http://localhost:8080/user/request';

  constructor(private http : HttpClient) { }

  createRequest(requestData:any): Observable<Request> {
    return this.http.post<Request>(`${this.url}/create`, requestData);
  }

    getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.url}/readall`).pipe(
      map(response => response as Request[])
    );
  }
  getUserRequests(id:any): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.url}/getRequests-Student/${id}`).pipe(
      map(response => response as Request[])
    );
  }


  updateRequest(requestData:any,idRequest: number): Observable<Request> {
    return this.http.put<Request>(`${this.url}/update/${idRequest}`,requestData)
  }


  getUserRequest(id:any): Observable<User> {
    return this.http.get<User>(`${this.url}/getRequest-Student/${id}`).pipe(
      map(response => response as User)
    );
  }

  getRequestById(id:any): Observable<Request> {
    return this.http.get<Request>(`${this.url}/id/${id}`).pipe(
      map(response => response as Request)
    );
  }

}
