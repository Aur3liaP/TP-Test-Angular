import { Component, input, output, signal } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { AddTaskModaleComponent } from '../add-task-modale/add-task-modale.component';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { List, Task } from '../../app/store/boards.models';
import { Store } from '@ngrx/store';
import { addTask, updateTask } from '../../app/store/boards.actions';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TaskComponent, AddTaskModaleComponent, DragDropModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  listSignal = input.required<List>();
  boardId = input.required<number>();
  connectedDropLists = input.required<string[]>();
  updateList = output<List>();
  // dragStarted = output<void>();
  // dragEnded = output<void>();

  taskMove = output<{
    sourceListId: number;
    targetListId: number;
    taskId: number;
    sourceIndex: number;
    targetIndex: number;
  }>();

  isModalOpen = signal(false);

  constructor(private store: Store) {}

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  get connectedLists(): string[] {
    return this.connectedDropLists();
  }

  addTask(newTask: { title: string; description: string }) {
    this.store.dispatch(
      addTask({
        boardId: this.boardId(),
        listId: this.listSignal().id,
        task: newTask,
      })
    );
    this.closeModal();
  }

  drop(event: CdkDragDrop<Task[] | undefined>) {
    const currentList = this.listSignal();

    if (event.container.id === 'trash-drop-list') {
      return;
    }

    if (!event.previousContainer.data || !event.container.data) {
      return;
    }

    if (event.previousContainer === event.container) {
      this.taskMove.emit({
        sourceListId: currentList.id,
        targetListId: currentList.id,
        taskId: event.previousContainer.data[event.previousIndex].id,
        sourceIndex: event.previousIndex,
        targetIndex: event.currentIndex,
      });
    } else {
      const sourceListId = +event.previousContainer.id.replace(
        'cdk-drop-list-',
        ''
      );
      const movedTask = event.previousContainer.data[event.previousIndex];

      this.taskMove.emit({
        sourceListId: sourceListId,
        targetListId: currentList.id,
        taskId: movedTask.id,
        sourceIndex: event.previousIndex,
        targetIndex: event.currentIndex,
      });
    }
  }

  updateTask(editedTask: Task) {
    this.store.dispatch(
      updateTask({
        boardId: this.boardId(),
        listId: this.listSignal().id,
        task: editedTask,
      })
    );
  }

}