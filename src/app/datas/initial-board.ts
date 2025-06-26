import { Board } from '../store/boards.models';

export const initialBoards: Board[] = [
  {
    id: 1,
    title: 'Choses à faire',
    lists: [
      {
        id: 1,
        title: 'À faire',
        tasks: [
          { id: 1, title: 'Tâche 1', description: 'chose à faire' },
          { id: 2, title: 'Tâche 2', description: 'chose à faire' }
        ]
      },
      {
        id: 2,
        title: 'En cours',
        tasks: [
          { id: 4, title: 'Tâche 4', description: 'chose à faire' }
        ]
      },
      {
        id: 3,
        title: 'Fait',
        tasks: [
          { id: 3, title: 'Tâche 3', description: 'chose à faire' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Projet perso',
    lists: [
      {
        id: 1,
        title: 'À faire',
        tasks: [
          { id: 1, title: 'Tâche 1', description: 'chose à faire' },
          { id: 2, title: 'Tâche 2', description: 'chose à faire' }
        ]
      },
      {
        id: 2,
        title: 'En cours',
        tasks: [
          { id: 4, title: 'Tâche 4', description: 'chose à faire' }
        ]
      },
      {
        id: 3,
        title: 'Fait',
        tasks: [
          { id: 3, title: 'Tâche 3', description: 'chose à faire' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Les bonnes résolutions 2025',
    lists: [
      {
        id: 1,
        title: 'À faire',
        tasks: [
          { id: 1, title: 'Tâche 1', description: 'chose à faire' },
          { id: 2, title: 'Tâche 2', description: 'chose à faire' }
        ]
      },
      {
        id: 2,
        title: 'En cours',
        tasks: [
          { id: 4, title: 'Tâche 4', description: 'chose à faire' }
        ]
      },
      {
        id: 3,
        title: 'Fait',
        tasks: [
          { id: 3, title: 'Tâche 3', description: 'chose à faire' }
        ]
      }
    ]
  }
];