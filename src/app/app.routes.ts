import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'administrator',
        loadChildren: () => import('./administrator/administrator.module').then((m) => m.AdministratorModule),
      }
];
