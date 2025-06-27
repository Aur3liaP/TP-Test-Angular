import { Component, input, Input, output, signal } from '@angular/core';
import { Task } from '../../store/boards.models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { setDragState } from '../../store/boards.actions';

@Component({
  selector: 'app-task',
  imports: [DragDropModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input.required<Task>();
  update = output<Task>();
  dragStarted = output<void>();
  dragEnded = output<void>();

  isEditing = signal(false);
  editedTitle = signal('');
  editedDescription = signal('');

  constructor(private store: Store) {}

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

  onDragStarted() {
    this.store.dispatch(setDragState({ isDragging: true }));
  }

  onDragEnded() {
    this.store.dispatch(setDragState({ isDragging: false }));
  }
}
