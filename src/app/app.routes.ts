import { Routes } from '@angular/router';
import { authGuard } from '../_core/guards/auth.guard';
import { administratorGuard } from '../_core/guards/administrator.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [authGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'administrator',
    loadChildren: () =>
      import('./administrator/administrator.module').then(
        (m) => m.AdministratorModule
      ),
    canActivate: [administratorGuard],
  },
];
