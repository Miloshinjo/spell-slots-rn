import { useCallback, useReducer } from 'react';
import useLoadState from './useLoadState';
import usePersistState from './usePersistState';

import { MAX_LEVEL_LIMIT } from '../../constants/preferences';

export type SpellSlotsState = Map<number, Array<boolean>>;

type SpellSlotsAction = {
  type:
    | 'TOGGLE_SLOT'
    | 'ADD_LEVEL'
    | 'REMOVE_LEVEL'
    | 'ADD_SLOT'
    | 'REMOVE_SLOT'
    | 'LOAD_FROM_STORAGE'
    | 'CLEAR_SLOTS';
  payload?: any;
};

const initialState: SpellSlotsState = new Map();

function reducer(state: SpellSlotsState, action: SpellSlotsAction) {
  switch (action.type) {
    case 'TOGGLE_SLOT': {
      const mapCopy = new Map(state);

      let level = mapCopy.get(action.payload.level);

      if (level === undefined) {
        console.warn('Spell level not found in state.');
        return state;
      }

      const { slotIndex } = action.payload;

      level[slotIndex] = !level[slotIndex];

      mapCopy.set(action.payload.level, level);

      return new Map(mapCopy);
    }
    case 'ADD_LEVEL':
      return new Map([...state, [state.size + 1, [false]]]);

    case 'REMOVE_LEVEL': {
      const mapCopy = new Map(state);

      mapCopy.delete(mapCopy.size);

      return new Map(mapCopy);
    }
    case 'ADD_SLOT': {
      const mapCopy = new Map(state);

      const level = mapCopy.get(action.payload.level);

      if (level === undefined) {
        console.warn('Spell level not found in state.');
        return state;
      }

      mapCopy.set(action.payload.level, [...level, false]);

      return new Map(mapCopy);
    }
    case 'REMOVE_SLOT': {
      const mapCopy = new Map(state);

      const level = mapCopy.get(action.payload.level);

      if (level === undefined) {
        console.warn('Spell level not found in state.');
        return state;
      }

      level.pop();

      mapCopy.set(action.payload.level, level);

      return new Map(mapCopy);
    }
    case 'CLEAR_SLOTS': {
      const mapCopy = new Map(state);

      mapCopy.forEach((value, key) => {
        mapCopy.set(
          key,
          value.map(() => false)
        );
      });

      return new Map(mapCopy);
    }
    case 'LOAD_FROM_STORAGE':
      return action.payload.storageState as SpellSlotsState;
    default:
      return state;
  }
}

export default function useSpellSlotsState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist state to AsyncStorage
  const isLoadingFromStorage = useLoadState((storageState: SpellSlotsState) => {
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
    (level: number, slotIndex: number) => {
      dispatch({
        type: 'TOGGLE_SLOT',
        payload: {
          level,
          slotIndex,
        },
      });
    },
    [dispatch]
  );

  const addSlot = useCallback(
    (level: number) => {
      dispatch({
        type: 'ADD_SLOT',
        payload: {
          level,
        },
      });
    },
    [dispatch]
  );

  const removeSlot = useCallback(
    (level: number) => {
      dispatch({
        type: 'REMOVE_SLOT',
        payload: {
          level,
        },
      });
    },
    [dispatch]
  );

  const clearSlots = useCallback(() => {
    dispatch({
      type: 'CLEAR_SLOTS',
    });
  }, [dispatch]);

  const isFresh =
    [...state.values()].flat().find((v) => v === true) === undefined;

  return {
    addLevel,
    isFresh,
    isLoadingFromStorage,
    removeLevel,
    toggleSlot,
    spellSlotsLevels: state,
    addSlot,
    removeSlot,
    clearSlots,
  };
}
