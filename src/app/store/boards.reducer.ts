import { createReducer, on } from '@ngrx/store';
import { Board } from './boards.models';
import { loadBoardsSuccess, selectBoard } from './boards.actions';

export interface BoardsState {
  boards: Board[];
  selectedBoardId: number | null;
}

export const initialState: BoardsState = {
  boards: [],
  selectedBoardId: null,
};

export const boardsReducer = createReducer(
  initialState,
  on(loadBoardsSuccess, (state, { boards }) => ({ ...state, boards })),
  on(selectBoard, (state, { boardId }) => ({
    ...state,
    selectedBoardId: boardId,
  }))
);
