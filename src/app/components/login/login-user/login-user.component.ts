import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  loginError: string = '';

  loginData: { username: string, password: string } = { username: '', password: '' };

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  formSubmit() {
    console.log("Botón presionado");
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.accessToken);
        console.log("////////////////")
        console.log(data.accessToken);
        console.log("////////////////")
        console.log("////////////////")
        console.log("////////////////")
        this.loginService.getCurrentUser(data).subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);
            let rol = this.loginService.getUserRole();
            console.log(rol)
            this.router.navigateByUrl('home')
          },
          (error) => {
            console.log(error);
            if (error.status === 500 && error.error?.message === 'Bad credentials') {
              this.loginError = 'El nombre de usuario o la contraseña son incorrectos.';
            } else {
              this.loginError = 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.';
            }
          }
        );
      },
      (error) => {
        console.log(error);
        if (error.status === 500 && error.error?.message === 'Bad credentials') {
          this.loginError = 'El nombre de usuario o la contraseña son incorrectos.';
        } else {
          this.loginError = 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    );
  }
}
