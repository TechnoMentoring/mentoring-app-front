import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginUserComponent } from './login-user/login-user.component';
import { FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './profile-mentor/profile.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { StartModule } from '../start/start.module';
import { AllUsersComponent } from './all-users/all-users.component';




@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginUserComponent,
    ProfileComponent,
    AllUsersComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    SweetAlert2Module,
    StartModule,

  ],
  exports:[
    MaterialModule,
  ]
})
export class LoginModule { }
