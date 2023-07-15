import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ProfileComponent } from './profile-mentor/profile.component';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [{ path: 'register', component: RegisterUserComponent },
{ path: 'login', component: LoginUserComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'allUsers', component: AllUsersComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
