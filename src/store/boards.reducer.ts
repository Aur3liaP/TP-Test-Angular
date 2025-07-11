import { createReducer, on } from '@ngrx/store';
import { Board, List, Task } from './boards.models';
import {
  selectBoard,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  reorderTask,
  addList,
  updateList,
  deleteList,
  addBoard,
  updateBoard,
  deleteBoard,
  setDragState,
  loadBoards,
} from './boards.actions';
import { initialBoards } from '../datas/initial-board';

export interface BoardsState {
  boards: Board[];
  selectedBoardId: number | null;
  isDragging: boolean;
}

export const initialState: BoardsState = {
  boards: initialBoards,
  selectedBoardId: null,
  isDragging: false
};

function generateNewTaskId(tasks?: Task[]): number {
  return tasks && tasks.length > 0
    ? Math.max(...tasks.map((task) => task.id)) + 1
    : 1;
}

function generateNewBoardId(boards: Board[]): number {
  return boards.length > 0
    ? Math.max(...boards.map((board) => board.id)) + 1
    : 1;
}

function generateNewListId(lists: List[]): number {
  return lists.length > 0 ? Math.max(...lists.map((list) => list.id)) + 1 : 1;
}

export const boardsReducer = createReducer(
  initialState,

  // -----------------------Reducer pour les boards-----------------------
  on(loadBoards, (state, { boards }) => ({
    ...state,
    boards,
  })),

  on(selectBoard, (state, { boardId }) => ({
    ...state,
    selectedBoardId: boardId,
  })),

  on(addBoard, (state, { title }) => {
    const newBoard: Board = {
      id: generateNewBoardId(state.boards),
      title: title,
      lists: [
        {
          id: 1,
          title: 'À faire',
          tasks: [],
        },
        {
          id: 2,
          title: 'En cours',
          tasks: [],
        },
        {
          id: 3,
          title: 'Fait',
          tasks: [],
        },
      ],
    };

    return {
      ...state,
      boards: [...state.boards, newBoard],
    };
  }),

  // on(addBoardSuccess, (state, { board }) => ({
  //   ...state,
  //   boards: [...state.boards, board],
  // })),

  on(updateBoard, (state, { boardId, title }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.id === boardId ? { ...board, title } : board
    ),
  })),

  on(deleteBoard, (state, { boardId }) => ({
    ...state,
    boards: state.boards.filter((board) => board.id !== boardId),
    selectedBoardId:
      state.selectedBoardId === boardId ? null : state.selectedBoardId,
  })),

  // -----------------------Reducer pour les tâches-----------------------
  on(addTask, (state, { boardId, listId, task }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) =>
              list.id === listId
                ? {
                    ...list,
                    tasks: [
                      ...(list.tasks || []),
                      { ...task, id: generateNewTaskId(list.tasks) },
                    ],
                  }
                : list
            ),
          }
        : board
    ),
  })),

  on(updateTask, (state, { boardId, listId, task }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) =>
              list.id === listId
                ? {
                    ...list,
                    tasks: (list.tasks || []).map((t) =>
                      t.id === task.id ? task : t
                    ),
                  }
                : list
            ),
          }
        : board
    ),
  })),

  on(deleteTask, (state, { boardId, listId, taskId }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) =>
              list.id === listId
                ? {
                    ...list,
                    tasks: (list.tasks || []).filter(
                      (task) => task.id !== taskId
                    ),
                  }
                : list
            ),
          }
        : board
    ),
  })),

  on(
    reorderTask,
    (state, { boardId, listId, previousIndex, currentIndex }) => ({
      ...state,
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === listId
                  ? {
                      ...list,
                      tasks: (() => {
                        const newTasks = [...(list.tasks || [])];
                        const [movedTask] = newTasks.splice(previousIndex, 1);
                        newTasks.splice(currentIndex, 0, movedTask);
                        return newTasks;
                      })(),
                    }
                  : list
              ),
            }
          : board
      ),
    })
  ),

  on(
    moveTask,
    (
      state,
      { boardId, sourceListId, targetListId, taskId, sourceIndex, targetIndex }
    ) => {
      const board = state.boards.find((b) => b.id === boardId);
      if (!board) return state;

      const sourceList = board.lists.find((l) => l.id === sourceListId);
      const taskToMove = sourceList?.tasks?.find((t) => t.id === taskId);

      if (!taskToMove) return state;

      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === boardId
            ? {
                ...board,
                lists: board.lists.map((list) => {
                  if (list.id === sourceListId) {
                    return {
                      ...list,
                      tasks: (list.tasks || []).filter(
                        (task) => task.id !== taskId
                      ),
                    };
                  } else if (list.id === targetListId) {
                    const newTasks = [...(list.tasks || [])];
                    newTasks.splice(targetIndex, 0, taskToMove);
                    return {
                      ...list,
                      tasks: newTasks,
                    };
                  }
                  return list;
                }),
              }
            : board
        ),
      };
    }
  ),

  on(setDragState, (state, { isDragging }) => ({
  ...state,
  isDragging
})),

  // -----------------------Reducer pour les listes-----------------------
  
  on(addList, (state, { boardId, title }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            lists: [
              ...board.lists,
              {
                id: generateNewListId(board.lists),
                title,
                tasks: [],
              },
            ],
          }
        : board
    ),
  })),

  on(updateList, (state, { boardId, list }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((l) => (l.id === list.id ? list : l)),
          }
        : board
    ),
  })),

  on(deleteList, (state, { boardId, listId }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            lists: board.lists.filter((list) => list.id !== listId),
          }
        : board
    ),
  }))
);
