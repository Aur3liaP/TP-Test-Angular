import { Component, input, OnInit, output, signal } from '@angular/core';
import { List, ListComponent } from "../list/list.component";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  imports: [ListComponent, DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  boardId = input.required<number>();
  boardTitle = signal<string>('');
  lists = signal<List[]>([]);

    ngOnInit() {
    const fakeBoards: { [key: number]: List[] } = {
      1: [{ id: 1, title: 'À faire', tasks: [{ id: 1, title: 'Tâche 1', description: 'chose à faire' }, { id: 2, title: 'Tâche 2', description: 'chose à faire' }] }, { id: 2, title: 'En cours', tasks: [{ id: 4, title: 'Tâche 4', description: 'chose à faire' }] }, { id: 3, title: 'Fait', tasks: [{ id: 3, title: 'Tâche 3', description: 'chose à faire' }] }], 
      2: [{ id: 1, title: 'À faire', tasks: [{ id: 1, title: 'Tâche 1', description: 'chose à faire' }, { id: 2, title: 'Tâche 2', description: 'chose à faire' }] }, { id: 2, title: 'En cours', tasks: [{ id: 4, title: 'Tâche 4', description: 'chose à faire' }] }, { id: 3, title: 'Fait', tasks: [{ id: 3, title: 'Tâche 3', description: 'chose à faire' }] }], 
      3: [{ id: 1, title: 'À faire', tasks: [{ id: 1, title: 'Tâche 1', description: 'chose à faire' }, { id: 2, title: 'Tâche 2', description: 'chose à faire' }] }, { id: 2, title: 'En cours', tasks: [{ id: 4, title: 'Tâche 4', description: 'chose à faire' }] }, { id: 3, title: 'Fait', tasks: [{ id: 3, title: 'Tâche 3', description: 'chose à faire' }] }]
      };
      this.lists.set(fakeBoards[this.boardId()] || []);
    }


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
