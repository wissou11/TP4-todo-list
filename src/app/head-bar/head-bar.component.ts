import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TodoTemplateDrivenFormComponent} from "../todo-template-driven-form/todo-template-driven-form.component"
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-head-bar',
    imports: [RouterModule,CommonModule,TodoTemplateDrivenFormComponent],
    templateUrl: './head-bar.component.html',
    styleUrl: './head-bar.component.css'
})
export class HeadBarComponent {
  isNewTodoModalOpen = false;

  constructor(private router: Router, private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  openNewTodoModal(): void {
    const token = localStorage.getItem('token');

    if (token) {
    this.isNewTodoModalOpen = true;
  } else {
    this.router.navigate(['/sign-in']);
  }
  }
  logout(): void {
    this.authService.logout();
    console.log('Successfully logged out');
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated(): boolean {
    if(this.authService.isAuthenticated()){
      return true
    }
    else return false
  }

  closeNewTodoModal(): void {
    this.isNewTodoModalOpen = false;
  }
}
