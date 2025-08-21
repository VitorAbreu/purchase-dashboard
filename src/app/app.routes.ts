import { Routes } from '@angular/router';
import { TasksComponent } from '@core/tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: 'form',
    loadComponent: () => import('@features/form/form.component').then((mod) => mod.FormComponent),
  },
  {
    path: 'form/:id',
    loadComponent: () => import('@features/form/form.component').then((mod) => mod.FormComponent),
  },
  {
    path: 'users',
    loadComponent: () => import('@features/users/users.component').then((mod) => mod.UsersComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('@features/settings/settings.component').then((mod) => mod.SettingsComponent),
  },
];
