import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardComponent } from '../../components/board/board.component';

@Component({
  selector: 'app-board-details',
  imports: [BoardComponent],
  templateUrl: './board-details.component.html',
  styleUrl: './board-details.component.css'
})
export class BoardDetailsComponent {
  boardId: number;

  constructor(private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.boardId = idParam ? Number(idParam) : 0;
  }
}
