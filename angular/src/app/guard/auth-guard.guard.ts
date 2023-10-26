import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let token = localStorage.getItem('token');

  if (token) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
