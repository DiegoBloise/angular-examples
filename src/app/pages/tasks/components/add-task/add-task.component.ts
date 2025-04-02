import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'add-task',
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Output()
  onAddTask = new EventEmitter<any>();

  newTitle = '';

  addNewTask() {
    this.onAddTask.emit(new Task(this.newTitle));
    this.newTitle = '';
  }
}
