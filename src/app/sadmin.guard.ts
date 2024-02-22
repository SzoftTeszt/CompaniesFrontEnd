import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const sAdminGuard: CanActivateFn = (route, state) => {
  console.log("sadmin guard")
  return inject(AuthService).SadminSub;
};
