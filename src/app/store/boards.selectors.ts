import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './boards.reducer';

export const selectBoardsState = createFeatureSelector<BoardsState>('boards');

export const selectAllBoards = createSelector(
  selectBoardsState,
  (state) => state.boards
);

export const selectSelectedBoard = createSelector(
  selectBoardsState,
  (state) => state.boards.find(board => board.id === state.selectedBoardId)
);