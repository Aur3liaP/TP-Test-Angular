import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddTaskModaleComponent } from '../add-task-modale/add-task-modale.component';
import { TaskComponent } from '../task/task.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, TaskComponent, AddTaskModaleComponent, DragDropModule],
      providers: [provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    fixture.componentRef.setInput('listSignal', {
      id: 1,
      title: 'Test input List',
      task : [{id: 1,
      title: 'Test input Task',
      description: 'Test input Description'}]
    });
    fixture.componentRef.setInput('boardId', {
      id: 1,
    });
    fixture.componentRef.setInput('connectedDropLists', {
      id: '1',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
