import { createJSONStorage, type StateStorage } from 'zustand/middleware';

/**
 * localStorage que nunca lanza: en modo privado, con el almacenamiento lleno o bloqueado,
 * la app sigue funcionando (sin recordar) en vez de romperse.
 */
const safeLocalStorage: StateStorage = {
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      /* sin almacenamiento: se ignora */
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      /* sin almacenamiento: se ignora */
    }
  },
};

export const persistStorage = createJSONStorage(() => safeLocalStorage);
