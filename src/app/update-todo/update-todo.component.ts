import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-update-todo',
    imports: [CommonModule,FormsModule],
    templateUrl: './update-todo.component.html',
    styleUrl: './update-todo.component.css'
})
export class UpdateTodoComponent {
  @Input() todo!: Todo; // Todo to be updated
  @Output() closeModal = new EventEmitter<void>();

  minDateTime: string;

  constructor(private todoService: TodoService) {
    this.minDateTime = this.getMinDateTime();
  }

  private getMinDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16); 
  }

  getFormattedDate(date: Date): string {
    return date.toISOString().slice(0, 16);
  }

  updateTodo(): void {
    this.todoService.updateTodo(this.todo).subscribe(
      updatedTodo => {
        alert('Todo updated successfully!');
      },
      error => {
        console.error('Error updating todo:', error);
        alert('Failed to update todo.');
      }
    );
  }

  closeUpdateModel(): void {
    this.closeModal.emit();
  }
}
