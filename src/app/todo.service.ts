import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      map(todos => todos.map(todo => ({
        ...todo,
        date: new Date(todo.date)
      }))),
      catchError(error => {
        console.error('Erreur lors de la récupération de la liste des todos:', error);
        return of([]);
      })
    );
  }


  getTodoById(todoId: number): Observable<Todo | undefined> {
    return this.http.get<Todo>(`${this.apiUrl}/${todoId}`).pipe(
      map(todo => ({
        ...todo,
        date: new Date(todo.date)
      })),
      catchError(error => {
        console.error('Erreur lors de la récupération du todo:', error);
        return of(undefined);
      })
    );
  }
  addTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout du todo:', error);
        return throwError(() => new Error('Erreur lors de l\'ajout du todo.'));
      })
    );
  }


  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour du todo:', error);
        return of(todo);
      })
    );
  }

  deleteTodo(todoId: number): Observable<void> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression du todo:', error);
        return of();
      })
    );
  }
}
