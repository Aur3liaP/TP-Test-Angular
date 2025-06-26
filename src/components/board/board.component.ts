import { Component, input, OnInit, output, signal } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Board, List } from '../../app/store/boards.models';
import { Store } from '@ngrx/store';
import {
  addList,
  deleteBoard,
  deleteList,
  moveTask,
  reorderTask,
  updateBoard,
  updateList,
} from '../../app/store/boards.actions';
import { Observable } from 'rxjs';
import {
  selectBoardLists,
  selectBoardTitle,
} from '../../app/store/boards.selectors';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { EditBoardModaleComponent } from "../edit-board-modale/edit-board-modale.component";

@Component({
  selector: 'app-board',
  imports: [ListComponent, DragDropModule, AsyncPipe, EditBoardModaleComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  boardId = input.required<number>();
  lists$!: Observable<List[]>;
  boardTitle$!: Observable<string>;
  connectedDropListIds = signal<string[]>([]);

  isBoardModalOpen = signal(false);
  editableTitle = '';
  newListTitle = '';
  lists: List[] = [];

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    const id = this.boardId();

    this.lists$ = this.store.select(selectBoardLists(id));
    this.boardTitle$ = this.store.select(selectBoardTitle(id));

    this.boardTitle$.subscribe((title) => (this.editableTitle = title));
    this.lists$.subscribe((lists) => {
      this.connectedDropListIds.set(
        lists.map((list) => `cdk-drop-list-${list.id}`)
      );
      this.lists = lists;
    });
  }

  openBoardModal() {
    this.isBoardModalOpen.set(true);
  }
  closeBoardModal() {
    this.isBoardModalOpen.set(false);
    this.newListTitle = '';
  }

  saveBoardTitle() {
    this.store.dispatch(
      updateBoard({
        boardId: this.boardId(),
        title: this.editableTitle,
      })
    );
  }

 addListFromModal(event: { title: string }) {
  this.store.dispatch(
    addList({
      boardId: this.boardId(),
      title: event.title,
    })
  );
}

  deleteList(listId: number) {
    this.store.dispatch(
      deleteList({
        boardId: this.boardId(),
        listId,
      })
    );
  }

  deleteBoard() {
    if (confirm('Es-tu sûr(e) de vouloir supprimer ce tableau ?')) {
      this.store.dispatch(deleteBoard({ boardId: this.boardId() }));
      this.closeBoardModal();
      this.router.navigate(['']);
    }
  }

  handleListUpdate(updatedList: List) {
    this.store.dispatch(
      updateList({
        boardId: this.boardId(),
        list: updatedList,
      })
    );
  }

  handleTaskMove(event: {
    sourceListId: number;
    targetListId: number;
    taskId: number;
    sourceIndex: number;
    targetIndex: number;
  }) {
    if (event.sourceListId === event.targetListId) {
      this.store.dispatch(
        reorderTask({
          boardId: this.boardId(),
          listId: event.sourceListId,
          previousIndex: event.sourceIndex,
          currentIndex: event.targetIndex,
        })
      );
    } else {
      this.store.dispatch(
        moveTask({
          boardId: this.boardId(),
          sourceListId: event.sourceListId,
          targetListId: event.targetListId,
          taskId: event.taskId,
          sourceIndex: event.sourceIndex,
          targetIndex: event.targetIndex,
        })
      );
    }
  }
}
