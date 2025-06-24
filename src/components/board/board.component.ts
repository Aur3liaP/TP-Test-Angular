import { Component } from '@angular/core';
import { ListComponent } from "../list/list.component";

@Component({
  selector: 'app-board',
  imports: [ListComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  lists = [
    { id: 1, title: 'A faire', tasks: [{ id: 1, title: 'Tâche 1', description: 'chose à faire' }, { id: 2, title: 'Tâche 2', description: 'chose à faire' }] },
    { id: 2, title: 'En cours', tasks: [{ id: 4, title: 'Tâche 4', description: 'chose à faire' }] },
    { id: 3, title: 'Fait', tasks: [{ id: 3, title: 'Tâche 3', description: 'chose à faire' }] }
  ]
}
