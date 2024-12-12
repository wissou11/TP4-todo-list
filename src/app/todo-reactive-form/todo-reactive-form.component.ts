import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-todo-reactive-form',
    imports: [ReactiveFormsModule,CommonModule],
    templateUrl: './todo-reactive-form.component.html',
    styleUrl: './todo-reactive-form.component.css'
})
export class TodoReactiveFormComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.authService.login(login, password).subscribe((success) => {
        if (success) {
          this.router.navigate(['/todos']); // Redirect to Todos
        } else {
          this.loginError = 'Invalid login or password.';
        }
      });
    }
  }
}
