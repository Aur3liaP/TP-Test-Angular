import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardDetailsComponent } from './board-details.component';
import { BoardComponent } from '../../components/board/board.component';
import { ActivatedRoute } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { boardsReducer } from '../../app/store/boards.reducer';
import { of } from 'rxjs';

describe('BoardDetailsComponent', () => {
  let component: BoardDetailsComponent;
  let fixture: ComponentFixture<BoardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDetailsComponent, BoardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (param: string) => (param === 'id' ? '1' : null) }),
            snapshot: { paramMap: { get: (param: string) => (param === 'id' ? '1' : null) } }
          }
        },
        provideStore({ board: boardsReducer })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
