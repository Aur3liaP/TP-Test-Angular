import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoardModaleComponent } from './edit-board-modale.component';

describe('EditBoardModaleComponent', () => {
  let component: EditBoardModaleComponent;
  let fixture: ComponentFixture<EditBoardModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBoardModaleComponent]
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
