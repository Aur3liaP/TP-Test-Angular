import {
  Component,
  computed,
  effect,
  input,
  Input,
  output,
  signal,
} from '@angular/core';
import { Task, TaskComponent } from '../task/task.component';
import { AddTaskModaleComponent } from '../add-task-modale/add-task-modale.component';
import {
  CdkDropList,
  CdkDrag,
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TaskComponent, AddTaskModaleComponent, DragDropModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  listSignal = input.required<List>();
  connectedDropLists = input<string[]>([]);
  updateList = output<List>();

  isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  get connectedLists(): string[] {
    return this.connectedDropLists() ?? [];
  }

  addTask(newTask: { title: string; description: string }) {
    const currentList = this.listSignal();

    const maxId =
      currentList.tasks.length > 0
        ? Math.max(...currentList.tasks.map((task) => task.id))
        : 0;

    const taskToAdd: Task = {
      id: maxId + 1,
      title: newTask.title,
      description: newTask.description,
    };

    const updatedList = {
      ...currentList,
      tasks: [...currentList.tasks, taskToAdd],
    };

    this.updateList.emit(updatedList);
    this.closeModal();
  }

  drop(event: CdkDragDrop<Task[]>) {
    const currentList = this.listSignal();

    if (event.previousContainer === event.container) {
      const updatedTasks = [...currentList.tasks];
      moveItemInArray(updatedTasks, event.previousIndex, event.currentIndex);

      const updatedList = { ...currentList, tasks: updatedTasks };
      this.updateList.emit(updatedList);
    } else {
      const previousTasks = event.previousContainer.data;
      const currentTasks = [...currentList.tasks];

      const [movedTask] = previousTasks.splice(event.previousIndex, 1);
      currentTasks.splice(event.currentIndex, 0, movedTask);

      const sourceListId = +event.previousContainer.id.replace(
        'cdk-drop-list-',
        ''
      );

      const sourceListUpdate: List = {
        id: sourceListId,
        title: '',
        tasks: previousTasks,
      };

      this.updateList.emit(sourceListUpdate);

      const updatedList: List = {
        ...currentList,
        tasks: currentTasks,
      };

      this.updateList.emit(updatedList);
    }
  }

  updateTask(editedTask: Task) {
    const updatedTasks = this.listSignal().tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );

    const updatedList = {
      ...this.listSignal(),
      tasks: updatedTasks,
    };

    this.updateList.emit(updatedList);
  }
}
export interface List {
  id: number;
  title: string;
  tasks: Task[];
}
