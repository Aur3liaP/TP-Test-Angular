import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../app/store/boards.models';
import { selectAllBoards } from '../../app/store/boards.selectors';
import { AsyncPipe } from '@angular/common';
import { addBoard } from '../../app/store/boards.actions';
import { AddBoardModaleComponent } from "../../components/add-board-modale/add-board-modale.component";

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, AddBoardModaleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  boards$: Observable<Board[]>;
  isModalOpen = signal(false);

  constructor(private router: Router, private store: Store) {
    this.boards$ = this.store.select(selectAllBoards);
  }

  goToBoard(id: number) {
    this.router.navigate(['/board', id]);
  }
  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  addNewBoard(boardData: { title: string }) {
    this.store.dispatch(addBoard({ title: boardData.title }));
    this.closeModal();
  }

  getTotalTasks(board: Board): number {
    return board.lists.reduce((total, list) => total + (list.tasks?.length || 0), 0);
  }

  getCompletedTasks(board: Board): number {
    const completedList = board.lists.find(list => list.title.toLowerCase().includes('fait') || list.title.toLowerCase().includes('terminé') || list.title.toLowerCase().includes('done'));
    return completedList?.tasks?.length || 0;
  }

  getCompletionPercentage(board: Board): number {
    const total = this.getTotalTasks(board);
    if (total === 0) return 0;
    const completed = this.getCompletedTasks(board);
    return Math.round((completed / total) * 100);
  }
}
