import { createAction, props } from '@ngrx/store';
import { Board, List, Task } from './boards.models';

// -----------------------Actions pour les boards-----------------------
export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoardsSuccess = createAction(
  '[Boards] Load Boards Success',
  props<{ boards: Board[] }>()
);
export const selectBoard = createAction(
  '[Boards] Select Board',
  props<{ boardId: number }>()
);


// -----------------------Actions pour les tâches-----------------------
export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ boardId: number; listId: number; task: Omit<Task, 'id'> }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ boardId: number; listId: number; task: Task }>()
);

export const moveTask = createAction(
  '[Tasks] Move Task',
  props<{ 
    boardId: number; 
    sourceListId: number; 
    targetListId: number; 
    taskId: number; 
    sourceIndex: number; 
    targetIndex: number; 
  }>()
);

export const reorderTask = createAction(
  '[Tasks] Reorder Task',
  props<{ 
    boardId: number; 
    listId: number; 
    previousIndex: number; 
    currentIndex: number; 
  }>()
);


// -----------------------Actions pour les listes-----------------------
export const updateList = createAction(
  '[Lists] Update List',
  props<{ boardId: number; list: List }>()
);