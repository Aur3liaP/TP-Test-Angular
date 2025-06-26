import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-board-modale',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-board-modale.component.html',
  styleUrl: './add-board-modale.component.css',
})
export class AddBoardModaleComponent {
  boardForm: FormGroup;
  addBoard = output<{ title: string }>();
  close = output<void>();
  maxChars = 25;

  constructor(private fb: FormBuilder) {
    this.boardForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  get title() {
    return this.boardForm.get('title');
  }

  onSubmit() {
    if (this.boardForm.valid) {
      this.addBoard.emit(this.boardForm.value);
      this.boardForm.reset();
      this.close.emit();
    } else {
      Object.keys(this.boardForm.controls).forEach((key) => {
        this.boardForm.get(key)?.markAsTouched();
      });
    }
  }

  closeModal() {
    this.boardForm.reset();
    this.close.emit();
  }

  onTitleInput(event: any) {
    const value = event.target.value;
    if (value.length > this.maxChars) {
      this.boardForm.patchValue({
        title: value.slice(0, this.maxChars),
      });
    }
  }
}
