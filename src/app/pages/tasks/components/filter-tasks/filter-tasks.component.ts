import { Component, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../models/task.model';

const filters = [
  (t: Task) => t,
  (t: Task) => !t.isComplete,
  (t: Task) => t.isComplete,
];

@Component({
  selector: 'filter-tasks',
  imports: [FormsModule],
  templateUrl: './filter-tasks.component.html',
  styleUrl: './filter-tasks.component.css',
})
export class FilterTasksComponent implements OnInit {
  filter = model<any>();
  optionValue = model<any>();

  selectedFilter: string = '0';

  ngOnInit(): void {
    this.updateFilter(this.selectedFilter);
  }

  updateFilter(value: any) {
    this.filter.set(filters[Number(value)]);
    this.optionValue.set(this.selectedFilter);
  }
}
