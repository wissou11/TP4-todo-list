import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoReactiveFormComponent } from './todo-reactive-form/todo-reactive-form.component';
import { TodoTemplateDrivenFormComponent } from './todo-template-driven-form/todo-template-driven-form.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent, canActivate: [authGuard] },
  { path: 'sign-in', component: TodoReactiveFormComponent },
  { path: 'new-todo', component: TodoTemplateDrivenFormComponent, canActivate: [authGuard] },  // Protected route
];
