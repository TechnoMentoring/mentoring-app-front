import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public editMode = false;
  public user!:User;


  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['idUser', 'name', 'email','password','dni','acciones'];

  filterForm: FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor
(
  private userService: UserService,
  private formBuilder: FormBuilder,
  public  loginService :LoginService,
  private router: Router,

){  
  
  this.filterForm = this.formBuilder.group({
  startDate: ['', Validators.required],
  endDate: ['', Validators.required],});
  this.dataSource = new MatTableDataSource<User>([]);
  }


ngOnInit(): void {
  this.getUser();
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
getUser() {
  this.user = this.loginService.getUser();
  this.dataSource.data = [this.user];
}


toggleEditMode() {
  if (this.editMode) {
    if (!this.isValidEmailFormat(this.user.email)) {
      Swal.fire(
        'Correo no valido',
        'Porfabor ingrese un correo valido',
        'error'
      );
      return; 
    }

    if (!this.isValidDniFormat(this.user.dni)) {
      Swal.fire(
        'DNI no valido',
        'Porfabor ingrese 8 digitos',
        'error'
      );
      return; 
    }

    Swal.fire({
      title: '¿Deseas editar tu perfil?',
      text: "Esta accion no se puede revertir",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, deseo editar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Datos editados',
          'Los datos se actualizaran al reiniciar sesion',
          'success'
        );
        this.userService.updateUser(this.user, this.user.idUser).subscribe(
          (updatedUser: User) => {
            console.log('Datos actualizados:', updatedUser);
          },
          (error: any) => {
            console.error('Error al actualizar los datos:', error);
          }
        );
      }
    });
  }

  this.editMode = !this.editMode;
}

isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

isValidDniFormat(dni: string): boolean {
  const dniRegex = /^[0-9]{8}$/;
  return dniRegex.test(dni);
}









public logout(){
  this.loginService.logOut();
  
}




goBack(): void {
  if(this.loginService.getUserRole()=='ADMIN'){
    this.router.navigateByUrl('home')
  }else if(this.loginService.getUserRole()=='MENTOR'){
    this.router.navigateByUrl('home')
  }else if(this.loginService.getUserRole()=='STUDENT'){
    this.router.navigateByUrl('home')
  }
}






}
