export const STORAGE_KEY = 'boards-state';

export function saveStateToLocalStorage(state: any): void {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.error('Erreur sauvegarde localStorage', e);
  }
}

export function loadStateFromLocalStorage(): any {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    console.error('Erreur chargement localStorage', e);
    return undefined;
  }
}
