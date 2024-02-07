import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('access_token')) {
    return true;
  }
  else {
    localStorage.removeItem('access_token');
    router.navigateByUrl('/auth');
    return false;
  }
};
