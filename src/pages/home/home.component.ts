import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../app/store/boards.models';
import { selectAllBoards } from '../../app/store/boards.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  boards$: Observable<Board[]>;

  constructor(private router: Router, private store: Store) {
    this.boards$ = this.store.select(selectAllBoards);
  }

  goToBoard(id: number) {
    this.router.navigate(['/board', id]);
  }
}
