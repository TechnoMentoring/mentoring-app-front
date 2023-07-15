import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

export const studentGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  if(loginService.isLoggetIn() && loginService.getUserRole() == 'STUDENT'){
  return true;
  }
  router.navigate(['login']);
  return false;
};
