import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskModaleComponent } from './add-task-modale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddTaskModaleComponent', () => {
  let component: AddTaskModaleComponent;
  let fixture: ComponentFixture<AddTaskModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskModaleComponent, ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.taskForm.value).toEqual({ title: '', description: '' });
  });

  it('should emit addTask event when form is valid and submitted', () => {
    spyOn(component.addTask, 'emit');
    component.taskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
    });
    component.onSubmit();
    expect(component.addTask.emit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
    });
  });

  it("shouldn't emit addTask event when form is invalid and submitted", () => {
    spyOn(component.addTask, 'emit');
    component.taskForm.setValue({ title: '', description: '' });
    component.onSubmit();
    expect(component.addTask.emit).not.toHaveBeenCalled();
  });

  it('should reset the form when closeModal is called', () => {
    component.taskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
    });
    component.closeModal();
    expect(component.taskForm.value).toEqual({ title: '', description: '' });
  });
});
