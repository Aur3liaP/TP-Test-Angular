import { createAction, props } from '@ngrx/store';
import { Board } from './boards.models';

export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoardsSuccess = createAction(
  '[Boards] Load Boards Success',
  props<{ boards: Board[] }>()
);
export const selectBoard = createAction(
  '[Boards] Select Board',
  props<{ boardId: number }>()
);
