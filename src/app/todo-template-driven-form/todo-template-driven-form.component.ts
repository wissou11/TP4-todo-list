import { Component, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common'
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-todo-template-driven-form',
    imports: [CommonModule,FormsModule],
    templateUrl: './todo-template-driven-form.component.html',
    styleUrl: './todo-template-driven-form.component.css'
})
export class TodoTemplateDrivenFormComponent {
  todo: Todo = {
    id: 0,
    title: '',
    description: '',
    done: false,
    date: new Date()
  };

  minDateTime: string;

  @Output() closeModal = new EventEmitter<void>();

  constructor(private todoService: TodoService) {
    this.minDateTime = this.getMinDateTime();
  }

  private getMinDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }

  addTodo(): void {
    const { id, ...todoWithoutId } = this.todo;

    this.todoService.addTodo(todoWithoutId).subscribe(
      addedTodo => {
        alert('Todo ajouté avec succès!');
        this.todo = {
          id: 0,
          title: '',
          description: '',
          done: false,
          date: new Date()
        };
        this.closeModal.emit();
      },
      error => {
        console.error('Erreur lors de l\'ajout du todo:', error);
        alert('Impossible d\'ajouter le todo.');
      }
    );
  }

  close(): void {
    this.closeModal.emit();
  }
}
