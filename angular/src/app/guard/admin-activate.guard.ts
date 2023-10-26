import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user.role && user.role !== 'admin') {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
