import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AuthService } from '../auth.service';
@Component({
    selector: 'app-todo-detail',
    imports: [FontAwesomeModule],
    templateUrl: './todo-detail.component.html',
    styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent {
  @Input() todo!: Todo;
  @Output() closeModal = new EventEmitter<void>();
  faCheck = faCheck;

  constructor(private todoService: TodoService, private authService: AuthService) {}

  updateTodo(): void {
    if(this.authService.isAuthenticated()){
    this.todo.done = !this.todo.done;
    this.todoService.updateTodo(this.todo).subscribe(
      updatedTodo => {
        this.todo = updatedTodo;
        alert('Todo mis à jour avec succès.');
      },
      error => {
        console.error('Erreur lors de la mise à jour du todo:', error);
        alert('Impossible de mettre à jour le todo.');
      }
    );
  }else {
    
  }
  }

  close(): void {
    this.closeModal.emit();
  }
}
