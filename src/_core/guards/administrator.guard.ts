import { CanActivateFn } from '@angular/router';

export const administratorGuard: CanActivateFn = (route, state) => {
  var userId = localStorage.getItem('UserId');
  if (parseInt(userId) == 0) return true;
  return false;
};
