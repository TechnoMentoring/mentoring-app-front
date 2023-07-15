import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Login } from 'src/app/model/Login';

@Injectable({
  providedIn: 'root'
}) 
export class LoginService {
  private url = 'http://localhost:8080/user';

constructor(
  private router:Router,
  private http : HttpClient) { }

public loginStatusSubject = new Subject<boolean>();

generateToken(loginData:any){
  return this.http.post<Login>(`${this.url}/login`, loginData);
}

public loginUser(token:any){
  localStorage.setItem('token',token);
}

public isLoggetIn(){
  let tokenStr = localStorage.getItem('token');
  if(tokenStr == undefined || tokenStr =='' || tokenStr == null ){
    return false;
  }else{
    return true;
  }
}
///////////////////cerrar session
public logOut(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
}

public getToken(){
  return localStorage.getItem('token');
}

public setUser(user:any){
  localStorage.setItem('user',JSON.stringify(user))
}

public getUser(){
  let UserStr = localStorage.getItem('user');
  if(UserStr != null){
    return JSON.parse(UserStr);
  }else{
    this.logOut();
    return null;  
  }
}

public getUserRole(){
  let user = this.getUser();
  return user.roles[0].name;
}

public getCurrentUser(loginData:any){
  return this.http.post<Token>(`${this.url}/userbytoken`, loginData);
}

}

