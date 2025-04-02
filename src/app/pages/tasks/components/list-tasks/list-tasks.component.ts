import { Component, Input } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'list-tasks',
  imports: [TaskItemComponent],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css',
})
export class ListTasksComponent {
  @Input() tasks!: Task[];
  @Input() emptyMessage!: string;
}
