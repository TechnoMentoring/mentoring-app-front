import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

export const mentorGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  if(loginService.isLoggetIn() && loginService.getUserRole() == 'MENTOR'){
  return true;
  }
  router.navigate(['login']);
  return false;
};
