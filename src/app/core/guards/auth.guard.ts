import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/firebase-auth.service';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const user = authService.getCurrentUser();
  
  if (user) {
    return true;
  } else {
    router.navigate(['/login'], { 
      state: { navigateTo: state.url } 
    });
    return false;
  }
};