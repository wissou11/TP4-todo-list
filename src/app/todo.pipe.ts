import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todo',
  standalone: true
})
export class TodoPipe implements PipeTransform {

  transform(dueDate: string): string {
    const currentDate = new Date();
    const todoDate = new Date(dueDate);

    const timeDifference = todoDate.getTime() - currentDate.getTime();

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference <= 2 && daysDifference >= 0) {
      return 'todo-due-soon';
    }

    return '';
  }

}
