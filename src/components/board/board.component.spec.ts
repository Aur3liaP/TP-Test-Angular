import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { EditBoardModaleComponent } from '../edit-board-modale/edit-board-modale.component';
import { AsyncPipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListComponent } from '../list/list.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent, ListComponent, DragDropModule, AsyncPipe, EditBoardModaleComponent],
      providers: [provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    fixture.componentRef.setInput('boardId', {
      id: 1,
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
