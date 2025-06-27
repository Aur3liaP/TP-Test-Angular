import { createAction, props } from '@ngrx/store';
import { Board, List, Task } from './boards.models';

// -----------------------Actions pour les boards-----------------------
// export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoards = createAction(
  '[Boards] Load Boards Success',
  props<{ boards: Board[] }>()
);
export const selectBoard = createAction(
  '[Boards] Select Board',
  props<{ boardId: number }>()
);

export const addBoard = createAction(
  '[Boards] Add Board',
  props<{ title: string }>()
);

// export const addBoardSuccess = createAction(
//   '[Boards] Add Board Success',
//   props<{ board: Board }>()
// );

export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ boardId: number; title: string }>()
);

export const deleteBoard = createAction(
  '[Boards] Delete Board',
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

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ boardId: number; listId: number; taskId: number }>()
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

export const setDragState = createAction(
  '[Tasks] Set Drag List',
  props<{ isDragging: boolean }>()
);

// -----------------------Actions pour les listes-----------------------
export const addList = createAction(
  '[Lists] Add List',
  props<{ boardId: number; title: string }>()
);

export const updateList = createAction(
  '[Lists] Update List',
  props<{ boardId: number; list: List }>()
);

export const deleteList = createAction(
  '[Lists] Delete List',
  props<{ boardId: number; listId: number }>()
);
