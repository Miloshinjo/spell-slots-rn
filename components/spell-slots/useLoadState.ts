import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SpellSlotsState } from './useSpellSlotsState';

export default function useLoadState(
  setState: (storageState: SpellSlotsState) => void
) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return isLoading;
}
