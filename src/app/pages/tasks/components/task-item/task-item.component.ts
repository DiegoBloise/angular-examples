import { Component, Input } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { EventService } from '../../../../services/event/event.service';

@Component({
  selector: 'task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  constructor(private eventService: EventService) {}

  @Input() task!: Task;

  toggleIsComplete() {
    this.task.isComplete = !this.task.isComplete;
  }

  removeTask() {
    this.eventService.emit('removeTask', this.task);
  }
}
