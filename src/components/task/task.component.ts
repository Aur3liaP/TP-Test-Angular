import { Component, input, Input, output, signal } from '@angular/core';
import { Task } from '../../app/store/boards.models';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input.required<Task>();
  update = output<Task>();

  isEditing = signal(false);
  editedTitle = signal('');
  editedDescription = signal('');

  enableEdit() {
    this.editedTitle.set(this.task().title);
    this.editedDescription.set(this.task().description);
    this.isEditing.set(true);
  }

  saveEdit() {
    const newTask = {
      ...this.task(),
      title: this.editedTitle(),
      description: this.editedDescription(),
    };
    this.update.emit(newTask);
    this.isEditing.set(false);
  }

  cancelEdit() {
    this.isEditing.set(false);
  }

  onTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.editedTitle.set(input.value);
  }
  onDescriptionInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.editedDescription.set(input.value);
  }
}
