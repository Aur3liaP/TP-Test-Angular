import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { provideMockStore } from '@ngrx/store/testing';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent, DragDropModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    fixture.componentRef.setInput('task', {
      id: 1,
      title: 'Test input Task',
      description: 'Test input Description',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
