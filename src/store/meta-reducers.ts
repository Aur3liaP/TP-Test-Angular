import { ActionReducer, MetaReducer } from '@ngrx/store';
import { saveStateToLocalStorage } from '../utils/local-storage';
import { BoardsState } from './boards.reducer';

export interface AppState {
  boards: BoardsState;
}

export function persistBoardsState(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    const nextState = reducer(state, action);
    saveStateToLocalStorage(nextState.boards);
    return nextState;
  };
}

export const metaReducers: MetaReducer[] = [persistBoardsState];
