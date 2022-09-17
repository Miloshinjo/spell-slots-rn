import { useCallback, useEffect, useReducer, useState } from 'react';
import useLoadState from './useLoadState';
import usePersistState from './usePersistState';

export type SpellSlotsState = Array<Array<boolean>>;

type SpellSlotsAction = {
  type:
    | 'TOGGLE_SLOT'
    | 'ADD_LEVEL'
    | 'REMOVE_LEVEL'
    | 'ADD_SLOT'
    | 'REMOVE_SLOT'
    | 'LOAD_FROM_STORAGE';
  payload?: any;
};

const initialState: SpellSlotsState = [];

function reducer(state: SpellSlotsState, action: SpellSlotsAction) {
  switch (action.type) {
    case 'TOGGLE_SLOT':
      const stateCopy = [...state];

      stateCopy[action.payload.levelIndex][action.payload.slotIndex] =
        !stateCopy[action.payload.levelIndex][action.payload.slotIndex];

      return stateCopy;

    case 'ADD_LEVEL':
      return [...state, [false]];
    case 'REMOVE_LEVEL':
      return state.slice(0, -1);
    case 'ADD_SLOT':
      return state.map((level, levelIndex) => {
        if (levelIndex !== action.payload.levelIndex) {
          return level;
        }

        return [...level, false];
      });
    case 'REMOVE_SLOT':
      return state.map((level, levelIndex) => {
        if (levelIndex !== action.payload.levelIndex || level.length === 1) {
          return level;
        }

        return level.slice(0, -1);
      });
    case 'LOAD_FROM_STORAGE':
      return action.payload.storageState as SpellSlotsState;
    default:
      return state;
  }
}

export default function useSpellSlotsState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist state to AsyncStorage
  useLoadState((storageState: SpellSlotsState) => {
    dispatch({
      type: 'LOAD_FROM_STORAGE',
      payload: {
        storageState,
      },
    });
  });
  usePersistState(state);

  const addLevel = useCallback(() => {
    dispatch({
      type: 'ADD_LEVEL',
    });
  }, [dispatch]);

  const removeLevel = useCallback(() => {
    dispatch({
      type: 'REMOVE_LEVEL',
    });
  }, [dispatch]);

  const toggleSlot = useCallback(
    (levelIndex: number, slotIndex: number) => {
      dispatch({
        type: 'TOGGLE_SLOT',
        payload: {
          levelIndex,
          slotIndex,
        },
      });
    },
    [dispatch]
  );

  const addSlot = useCallback(
    (levelIndex: number) => {
      dispatch({
        type: 'ADD_SLOT',
        payload: {
          levelIndex,
        },
      });
    },
    [dispatch]
  );

  const removeSlot = useCallback(
    (levelIndex: number) => {
      dispatch({
        type: 'REMOVE_SLOT',
        payload: {
          levelIndex,
        },
      });
    },
    [dispatch]
  );

  return {
    addLevel,
    removeLevel,
    toggleSlot,
    spellSlotsLevels: state,
    addSlot,
    removeSlot,
  };
}
