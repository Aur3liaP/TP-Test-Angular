import { Component, inject, input, OnInit } from '@angular/core';
import { BoardComponent } from '../../components/board/board.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoard } from '../../app/store/boards.actions';

@Component({
  selector: 'app-board-details',
  imports: [BoardComponent],
  templateUrl: './board-details.component.html',
  styleUrl: './board-details.component.css',
})
export class BoardDetailsComponent implements OnInit {
  boardId: number;

  constructor(private route: ActivatedRoute, private store: Store) {
    const idParam = this.route.snapshot.paramMap.get('id');
    // this.boardId = idParam ? +idParam : 0;
    this.boardId = idParam ? Number(idParam) : 0;
    console.log('Board ID:', this.boardId);
  }

  ngOnInit() {
    this.store.dispatch(selectBoard({ boardId: this.boardId }));
  }
}
