import { Component, input, output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-board-modale',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-board-modale.component.html',
  styleUrl: './edit-board-modale.component.css',
})
export class EditBoardModaleComponent {
  boardForm: FormGroup;

  existingLists = input<{ id: number; title: string }[]>([]);
  boardTitle = input('');
  addList = output<{ title: string }>();
  deleteList = output<number>();
  updateBoardTitle = output<string>();
  updateList = output<{ id: number; title: string }>();
  listEditing = signal<number | null>(null);
  editedListTitle = signal('');
  close = output<void>();
  maxChars = 25;

  constructor(private fb: FormBuilder) {
    this.boardForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(this.maxChars),
        ],
      ],
    });
  }

  ngOnInit() {
    this.boardForm.patchValue({ title: this.boardTitle() });
  }

  get title() {
    return this.boardForm.get('title');
  }

  onSubmit() {
    if (this.boardForm.valid) {
      this.updateBoardTitle.emit(this.boardForm.value.title);
      this.closeModal();
    } else {
      Object.values(this.boardForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  handleAddList() {
    this.addList.emit({ title: 'Nouvelle liste' });
  }

  handleDeleteList(id: number) {
    this.deleteList.emit(id);
  }

  closeModal() {
    this.boardForm.reset();
    this.close.emit();
  }

  onTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > this.maxChars) {
      this.boardForm.patchValue({
        title: input.value.slice(0, this.maxChars),
      });
    }
  }

  startEditingList(list: { id: number; title: string }) {
    this.listEditing.set(list.id);
    this.editedListTitle.set(list.title);
  }

  cancelEditList() {
    this.listEditing.set(null);
    this.editedListTitle.set('');
  }

  saveListEdit(list: { id: number }) {
    const newTitle = this.editedListTitle().trim();
    if (newTitle) {
      this.updateList.emit({ id: list.id, title: newTitle });
    }
    this.listEditing.set(null);
    this.editedListTitle.set('');
  }

  onListTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.editedListTitle.set(input.value);
  }
}
