import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  var userId = localStorage.getItem('UserId');
  if (userId === null) return true;
  else return false;
};
