import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskModaleComponent } from './add-task-modale.component';

describe('AddTaskModaleComponent', () => {
  let component: AddTaskModaleComponent;
  let fixture: ComponentFixture<AddTaskModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskModaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
