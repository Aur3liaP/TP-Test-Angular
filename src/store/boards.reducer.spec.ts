// boards.reducer.spec.ts
import { initialState, boardsReducer } from './boards.reducer';
import * as BoardsActions from './boards.actions';

describe('Boards Reducer', () => {
  describe('selectBoard action', () => {
    it('should set the selectedBoardId in the state', () => {
      const boardId = 1;
      const action = BoardsActions.selectBoard({ boardId });
      const state = boardsReducer(initialState, action);
      expect(state.selectedBoardId).toEqual(boardId);
    });
  });

  describe('addBoard action', () => {
    it('should add a new board to the state', () => {
      const title = 'New Board';
      const action = BoardsActions.addBoard({ title });
      const state = boardsReducer(initialState, action);
      expect(state.boards.length).toEqual(initialState.boards.length + 1);
      expect(state.boards[state.boards.length - 1].title).toEqual(title);
    });
  });

  describe('updateBoard action', () => {
    it('should update the title of the specified board', () => {
      const boardId = 1;
      const newTitle = 'Updated Board Title';
      const initialStateWithBoard = {
        ...initialState,
        boards: [{ id: boardId, title: 'Old Title', lists: [] }],
      };
      const action = BoardsActions.updateBoard({ boardId, title: newTitle });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].title).toEqual(newTitle);
    });
  });

  describe('deleteBoard action', () => {
    it('should remove the specified board from the state', () => {
      const boardId = 1;
      const initialStateWithBoard = {
        ...initialState,
        boards: [{ id: boardId, title: 'Board to Delete', lists: [] }],
      };
      const action = BoardsActions.deleteBoard({ boardId });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards).toEqual([]);
    });
  });

  describe('addTask action', () => {
    it('should add a task to the specified list in the board', () => {
      const boardId = 1;
      const listId = 1;
      const task = { id: 1, title: 'Test Task', description: '...' };
      const initialStateWithBoard = {
        ...initialState,
        boards: [
          {
            id: boardId,
            title: 'Test Board',
            lists: [{ id: listId, title: 'Test List', tasks: [] }],
          },
        ],
      };
      const action = BoardsActions.addTask({ boardId, listId, task });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].lists[0].tasks).toContain(task);
    });
  });

  describe('updateTask action', () => {
    it('should update the specified task in the list', () => {
      const boardId = 1;
      const listId = 1;
      const task = { id: 1, title: 'Updated Task', description: '...' };
      const initialStateWithBoard = {
        ...initialState,
        boards: [
          {
            id: boardId,
            title: 'Test Board',
            lists: [
              {
                id: listId,
                title: 'Test List',
                tasks: [{ id: 1, title: 'Old Task', description: '...' }],
              },
            ],
          },
        ],
      };
      const action = BoardsActions.updateTask({ boardId, listId, task });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].lists[0].tasks?.[0]?.title).toEqual(
        'Updated Task'
      );
    });
  });

  describe('deleteTask action', () => {
    it('should remove the specified task from the list', () => {
      const boardId = 1;
      const listId = 1;
      const taskId = 1;
      const initialStateWithBoard = {
        ...initialState,
        boards: [
          {
            id: boardId,
            title: 'Test Board',
            lists: [
              {
                id: listId,
                title: 'Test List',
                tasks: [
                  { id: taskId, title: 'Task to Delete', description: '...' },
                ],
              },
            ],
          },
        ],
      };
      const action = BoardsActions.deleteTask({ boardId, listId, taskId });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].lists[0].tasks).toEqual([]);
    });
  });

  describe('reorderTask action', () => {
    it('should reorder tasks within the same list', () => {
      const boardId = 1;
      const listId = 1;
      const initialStateWithBoard = {
        ...initialState,
        boards: [
          {
            id: boardId,
            title: 'Test Board',
            lists: [
              {
                id: listId,
                title: 'Test List',
                tasks: [
                  { id: 1, title: 'Task 1', description: '...' },
                  { id: 2, title: 'Task 2', description: '...' },
                ],
              },
            ],
          },
        ],
      };
      const action = BoardsActions.reorderTask({
        boardId,
        listId,
        previousIndex: 0,
        currentIndex: 1,
      });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].lists[0].tasks?.[0]?.title).toEqual('Task 2');
      expect(state.boards[0].lists[0].tasks?.[1]?.title).toEqual('Task 1');
    });
  });

  describe('moveTask action', () => {
    it('should move a task from one list to another', () => {
      const boardId = 1;
      const sourceListId = 1;
      const targetListId = 2;
      const taskId = 1;
      const initialStateWithBoard = {
        ...initialState,
        boards: [
          {
            id: boardId,
            title: 'Test Board',
            lists: [
              {
                id: sourceListId,
                title: 'Test List',
                tasks: [
                  { id: taskId, title: 'Task to Move', description: '...' },
                ],
              },
              {
                id: targetListId,
                title: 'Target List',
                tasks: [],
              },
            ],
          },
        ],
      };
      const action = BoardsActions.moveTask({
        boardId,
        sourceListId,
        targetListId,
        taskId,
        sourceIndex: 0,
        targetIndex: 0,
      });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].lists[0].tasks).toEqual([]);
      expect(state.boards[0].lists[1].tasks?.[0]?.title).toEqual(
        'Task to Move'
      );
    });
  });

  describe('setDragState action', () => {
    it('should set the isDragging state', () => {
      const isDragging = true;
      const action = BoardsActions.setDragState({ isDragging });
      const state = boardsReducer(initialState, action);
      expect(state.isDragging).toEqual(isDragging);
    });
  });

  describe('addList action', () => {
    it('should add a new list to the specified board', () => {
      const boardId = 1;
      const title = 'New List';
      const initialStateWithBoard = {
        ...initialState,
        boards: [
          {
            id: boardId,
            title: 'Test Board',
            lists: [],
          },
        ],
      };
      const action = BoardsActions.addList({ boardId, title });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].lists.length).toEqual(1);
      expect(state.boards[0].lists[0].title).toEqual(title);
    });
  });

  describe('updateList action', () => {
    it('should update the specified list in the board', () => {
      const boardId = 1;
      const list = { id: 1, title: 'Updated List Title', tasks: [] };
      const initialStateWithBoard = {
        ...initialState,
        boards: [
          {
            id: boardId,
            title: 'Test Board',
            lists: [{ id: 1, title: 'Old List Title', tasks: [] }],
          },
        ],
      };
      const action = BoardsActions.updateList({ boardId, list });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].lists[0].title).toEqual('Updated List Title');
    });
  });

  describe('deleteList action', () => {
    it('should remove the specified list from the board', () => {
      const boardId = 1;
      const listId = 1;
      const initialStateWithBoard = {
        ...initialState,
        boards: [
          {
            id: boardId,
            title: 'Test Board',
            lists: [{ id: listId, title: 'List to Delete', tasks: [] }],
          },
        ],
      };
      const action = BoardsActions.deleteList({ boardId, listId });
      const state = boardsReducer(initialStateWithBoard, action);
      expect(state.boards[0].lists).toEqual([]);
    });
  });
});
