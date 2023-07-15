import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      profile: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get dni() {
    return this.userForm.get('dni');
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get profile() {
    return this.userForm.get('profile');
  }
  createUser(): void {
    if (this.userForm.valid) {
      const { username, password, name, dni, email, profile } = this.userForm.value;
      const userData: any = {
        username: username,
        password: password,
        name: name,
        email: email,
        profile: profile,
        dni: dni
      };
  
      if(profile=='Estudiante'){
        
      this.userService.registerStudent(userData).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          this.userForm.reset();
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro exitoso',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error: any) => {
          console.log('Error en la solicitud:', error);
            console.log('Mensaje de error del servidor:', error.error);
            swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'usuario ya registrado',
              showConfirmButton: false,
              timer: 1500
            });   
            console.log('Error desconocido en la solicitud');
        }
      );
      }

      if(profile=='Mentor'){
        
        this.userService.registerMentor(userData).subscribe(
          (response: any) => {
            console.log('Respuesta del servidor:', response);
            this.userForm.reset();
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error: any) => {
            console.log('Error en la solicitud:', error);
              console.log('Mensaje de error del servidor:', error.error);
              swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'usuario ya registrado',
                showConfirmButton: false,
                timer: 1500
              });   
              console.log('Error desconocido en la solicitud');
          }
        );
        }


        if(profile=='Administrador'){
        
          this.userService.registerAdm(userData).subscribe(
            (response: any) => {
              console.log('Respuesta del servidor:', response);
              this.userForm.reset();
              swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 1500
              });
            },
            (error: any) => {
              console.log('Error en la solicitud:', error);
                console.log('Mensaje de error del servidor:', error.error);
                swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'usuario ya registrado',
                  showConfirmButton: false,
                  timer: 1500
                });   
                console.log('Error desconocido en la solicitud');
            }
          );
          }


      console.log('Datos del usuario:', userData);
    }
  }
  

  resetForm(): void {
    this.userForm.reset();
  }
}
