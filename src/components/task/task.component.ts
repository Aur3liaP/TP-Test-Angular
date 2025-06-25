import { Component, input, Input, signal } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input.required<Task>();
}
export interface Task {
  id: number;
  title: string;
  description: string;
}