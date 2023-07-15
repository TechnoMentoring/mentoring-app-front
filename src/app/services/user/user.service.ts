import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/user';

  constructor(private http : HttpClient){} 

  getAllUsersX(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/readall`).pipe(
      map(response => response as User[])
    );
  }
  ////////////////

  createUser(UserData:any): Observable<User> {
    return this.http.post<User>(`${this.url}/create`, UserData);
  }

////////////////

  updateUser(UserData:any,idUser: number): Observable<User> {
    return this.http.put<User>(`${this.url}/update/${idUser}`, UserData);
  }

  registerStudent(loginData:any){
    return this.http.post<User>(`${this.url}/register/student`, loginData);
  }

  registerMentor(loginData:any){  
    return this.http.post<User>(`${this.url}/register/mentor`, loginData);
  }

  registerAdm(loginData:any){
    return this.http.post<User>(`${this.url}/register/adm`, loginData);
  }

  
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`).pipe(
      map(response => response as User[])
    );
  }
}
