import create from 'zustand';
import produce from 'immer';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SlotsState {
  levels: boolean[][];
  addLevel: () => void;
  removeLevel: () => void;
  toggleSlot: (levelIndex: number, slotIndex: number) => void;
  addSlot: (levelIndex: number) => void;
  removeSlot: (levelIndex: number) => void;
  setLevels: (levels: boolean[][]) => void;
  clearSlots: () => void;
}

const useSlotsStore = create<SlotsState>()(
  persist(
    (set) => ({
      levels: [],
      addLevel: () =>
        set(
          produce((state: SlotsState) => {
            state.levels.push([false]);
          })
        ),
      removeLevel: () =>
        set(
          produce((state: SlotsState) => {
            state.levels.pop();
          })
        ),
      toggleSlot: (levelIndex, slotIndex) => {
        set(
          produce((state: SlotsState) => {
            state.levels[levelIndex][slotIndex] =
              !state.levels[levelIndex][slotIndex];
          })
        );
      },
      addSlot: (levelIndex) => {
        set(
          produce((state: SlotsState) => {
            state.levels[levelIndex].push(false);
          })
        );
      },
      removeSlot: (levelIndex) => {
        set(
          produce((state: SlotsState) => {
            state.levels[levelIndex].pop();
          })
        );
      },
      clearSlots: () => {
        set(
          produce((state: SlotsState) => {
            state.levels = state.levels.map((level) =>
              level.map((slot) => false)
            );
          })
        );
      },
      setLevels: (levels) => {
        set(
          produce((state: SlotsState) => {
            state.levels = levels;
          })
        );
      },
    }),
    { name: '@spellSlotsState', getStorage: () => AsyncStorage }
  )
);

export default useSlotsStore;
