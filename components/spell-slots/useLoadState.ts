import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { SpellSlotsState } from './useSpellSlotsState';

export default function useLoadState(
  setState: (storageState: SpellSlotsState) => void
) {
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@spellSlotsState');

        if (!jsonValue) {
          return;
        }

        const data: SpellSlotsState = JSON.parse(jsonValue);

        setState(data);
      } catch (e) {
        // error reading value
        console.error('Error reading AsyncStorage value');
        return null;
      }
    };

    getData();
  }, []);
}
