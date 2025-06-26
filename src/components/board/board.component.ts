import { Component, input, OnInit, output, signal } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { List } from '../../app/store/boards.models';
import { Store } from '@ngrx/store';
import {
  moveTask,
  reorderTask,
  updateList,
} from '../../app/store/boards.actions';
import { Observable } from 'rxjs';
import {
  selectBoardLists,
  selectBoardTitle,
} from '../../app/store/boards.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [ListComponent, DragDropModule, AsyncPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  boardId = input.required<number>();
  lists$!: Observable<List[]>;
  boardTitle$!: Observable<string>;
  connectedDropListIds = signal<string[]>([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    const id = this.boardId();
    console.log('Board ID in BoardComponent:', id);

    this.lists$ = this.store.select(selectBoardLists(id));
    this.boardTitle$ = this.store.select(selectBoardTitle(id));

    this.lists$.subscribe((lists) => {
      this.connectedDropListIds.set(
        lists.map((list) => `cdk-drop-list-${list.id}`)
      );
    });
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
