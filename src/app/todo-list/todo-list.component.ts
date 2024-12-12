import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { Todo } from '../todo';
import { TodoService } from '../todo.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CommonModule} from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { TodoDetailComponent } from "../todo-detail/todo-detail.component";
import { UpdateTodoComponent } from "../update-todo/update-todo.component"
import { TodoDirective } from '../todo.directive';
import { TodoPipe } from '../todo.pipe';
@Component({
    selector: 'app-todo-list',
    imports: [FontAwesomeModule, TodoPipe , TodoDirective , CommonModule, TodoDetailComponent,UpdateTodoComponent,],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: Todo[] = [];
  selectedTodo: Todo | null = null;
  isModalOpen = false;
  isUpdateModalOpen = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  faList = faList;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  private loadTodos(): void {
    this.todoService.getTodoList().subscribe(
      todos => {
        this.todos = todos;
      },
      error => {
        console.error('Erreur lors de la récupération de la liste des todos:', error);
        alert('Impossible de charger les todos.');
      }
    );
  }


  openUpdateModal(todo: Todo): void {
    this.selectedTodo = todo;
    this.isUpdateModalOpen = true;
  }

  deleteTodo(todo: Todo): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le todo "${todo.title}" ?`)) {
      this.todoService.deleteTodo(todo.id).subscribe(
        () => {

          this.todos = this.todos.filter(t => t.id !== todo.id);
          alert('Todo supprimé avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression du todo:', error);
          alert('Erreur lors de la suppression du todo.');
        }
      );
    }
  }


  displayTodoDetail(todo: Todo): void {
    this.isModalOpen = true;
    this.todoService.getTodoById(todo.id).subscribe(
      todoDetail => {
        this.selectedTodo = todoDetail || null;
      },
      error => {
        console.error('Erreur lors de la récupération des détails du todo:', error);
        alert('Erreur lors de la récupération des détails du todo.');
      }
    );
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  closeModalUpdate(): void {
    this.isUpdateModalOpen = false;
  }
}
