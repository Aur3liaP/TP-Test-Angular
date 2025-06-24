import { Component, Input } from '@angular/core';
import { TaskComponent } from "../task/task.component";

@Component({
  selector: 'app-list',
  imports: [TaskComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Input() list: any;

  addTask() {
    this.list.tasks = [
      ...this.list.tasks,
      {
        id: this.list.tasks.length + 1,
        title: `Task ${this.list.tasks.length + 1}`,
        description: `Task ${this.list.description.length + 1}`,
      },
    ];
  }
}
