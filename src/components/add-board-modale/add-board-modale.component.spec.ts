import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardModaleComponent } from './add-board-modale.component';

describe('AddBoardModaleComponent', () => {
  let component: AddBoardModaleComponent;
  let fixture: ComponentFixture<AddBoardModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBoardModaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoardModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
