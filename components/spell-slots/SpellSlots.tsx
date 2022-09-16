import { Text, View } from 'react-native';
import SpellSlot from './SpellSlot';
import useSpellSlotsState from './useSpellSlotsState';

export default function SpellSlots() {
  const { state } = useSpellSlotsState();

  return (
    <View>
      <Text>{JSON.stringify(state, null, 2)}</Text>
      {/* <SpellSlot isChecked /> */}
    </View>
  );
}
