import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { EventService } from '../../services/event/event.service';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FilterTasksComponent } from './components/filter-tasks/filter-tasks.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';

@Component({
  selector: 'tasks',
  imports: [
    FormsModule,
    ListTasksComponent,
    FilterTasksComponent,
    AddTaskComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.listen('removeTask', (event) => {
      this.removeTask(event);
    });
  }

  tasks: Task[] = [];

  filter: any;

  optionValue: any;

  addTask(task: any) {
    this.tasks = [...this.tasks, task];
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  get message(): string {
    if (this.tasks.length < 1) {
      return 'No tasks added!';
    } else if (this.optionValue === '1') {
      return 'All tasks completed!';
    } else {
      return 'No tasks completed yet';
    }
  }
}
