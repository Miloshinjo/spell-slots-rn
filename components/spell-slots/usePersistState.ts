import { useEffect, useMemo } from 'react';
import type { SpellSlotsState } from './useSpellSlotsState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDebounce from '../../hooks/useDebounce';
import { serializeState } from '../../utils/serialize';

const storeData = async (key: string, state: SpellSlotsState) => {
  try {
    const jsonValue = serializeState(state);

    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.error('There was an error saving data to storage.');
  }
};

export default function usePersistState(state: SpellSlotsState) {
  const debouncedState = useDebounce(state, 1000);
  useEffect(() => {
    storeData('@spellSlotsState', debouncedState);
  }, [debouncedState]);
}
