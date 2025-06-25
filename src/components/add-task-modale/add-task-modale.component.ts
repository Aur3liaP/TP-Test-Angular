import { Component, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task-modale',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-task-modale.component.html',
  styleUrl: './add-task-modale.component.css'
})
export class AddTaskModaleComponent {
  taskForm: FormGroup;
  addTask = output<{ title: string; description: string }>();
  close = output<void>();
  maxChars = 50;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }

  onSubmit() {
    if (this.taskForm.valid) {
      this.addTask.emit(this.taskForm.value);
      this.taskForm.reset();
      this.close.emit();
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        this.taskForm.get(key)?.markAsTouched();
      });
    }
  }

  closeModal() {
    this.taskForm.reset();
    this.close.emit();
  }

  onDescriptionInput(event: any) {
  const value = event.target.value;
    if (value.length > this.maxChars) {
      this.taskForm.patchValue({
        descrition: value.slice(0, this.maxChars)
      });
    }
  }

}
