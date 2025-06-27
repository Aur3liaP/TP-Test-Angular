import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './boards.reducer';

export const selectBoardsState = createFeatureSelector<BoardsState>('boards');

export const selectAllBoards = createSelector(
  selectBoardsState,
  (state) => state.boards
);

export const selectSelectedBoardId = createSelector(
  selectBoardsState,
  (state) => state.selectedBoardId
);

export const selectSelectedBoard = createSelector(selectBoardsState, (state) =>
  state.boards.find((board) => board.id === state.selectedBoardId)
);

export const selectBoardById = (boardId: number) =>
  createSelector(selectBoardsState, (state) =>
    state.boards.find((board) => board.id === boardId)
  );

export const selectBoardLists = (boardId: number) =>
  createSelector(
    selectBoardsState,
    (state) => state.boards.find((board) => board.id === boardId)?.lists || []
  );

export const selectBoardTitle = (boardId: number) =>
  createSelector(
    selectBoardsState,
    (state) => state.boards.find((board) => board.id === boardId)?.title || ''
  );

export const selectIsDragging = createSelector(
  selectBoardsState,
  (state) => state.isDragging
);
