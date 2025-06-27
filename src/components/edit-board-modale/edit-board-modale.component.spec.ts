import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoardModaleComponent } from './edit-board-modale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EditBoardModaleComponent', () => {
  let component: EditBoardModaleComponent;
  let fixture: ComponentFixture<EditBoardModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBoardModaleComponent, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoardModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
