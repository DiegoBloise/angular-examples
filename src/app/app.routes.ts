import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent,
  },
  {
    title: 'Tasks',
    path: 'tasks',
    component: TasksComponent,
  },
  {
    title: 'Users',
    path: 'users',
    component: UsersComponent,
  },
];
