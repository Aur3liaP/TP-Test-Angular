import { Component, effect, input, Input, output, signal } from '@angular/core';
import { Task, TaskComponent } from "../task/task.component";
import { AddTaskModaleComponent } from "../add-task-modale/add-task-modale.component";

@Component({
  selector: 'app-list',
  imports: [TaskComponent, AddTaskModaleComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  listSignal = input.required<List>();
  isModalOpen = signal(false);
  updateList = output<List>();

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  addTask(newTask: { title: string; description: string }) {
    const currentList = this.listSignal();
    
    const maxId = currentList.tasks.length > 0 
      ? Math.max(...currentList.tasks.map(task => task.id))
      : 0;
    
    const taskToAdd: Task = {
      id: maxId + 1,
      title: newTask.title,
      description: newTask.description
    };

    const updatedList = {
      ...currentList,
      tasks: [...currentList.tasks, taskToAdd]
    };

    console.log('Nouvelle tâche à ajouter:', taskToAdd);
    console.log('Liste mise à jour:', updatedList);
    
    this.updateList.emit(updatedList);
    this.closeModal();
  }
}
export interface List {
  id: number;
  title: string;
  tasks: Task[];
}