import { Component, signal } from '@angular/core';
import { List, ListComponent } from "../list/list.component";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  imports: [ListComponent, DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  lists = signal<List[]>([
    { id: 1, title: 'À faire', tasks: [{ id: 1, title: 'Tâche 1', description: 'chose à faire' }, { id: 2, title: 'Tâche 2', description: 'chose à faire' }] },
    { id: 2, title: 'En cours', tasks: [{ id: 4, title: 'Tâche 4', description: 'chose à faire' }] },
    { id: 3, title: 'Fait', tasks: [{ id: 3, title: 'Tâche 3', description: 'chose à faire' }] }
  ])

  handleListUpdate(updatedList: List) {
    const updatedLists = this.lists().map((l: List) =>
    l.id === updatedList.id
      ? { ...updatedList, title: l.title }
      : l
  );
    this.lists.set(updatedLists);
  }

  get connectedDropListIds(): string[] {
  return this.lists().map((l) => 'cdk-drop-list-' + l.id);
}
}
