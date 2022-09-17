import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { gap } from './SpellSlotsLevel';

interface SpellSlotProps {
  isChecked: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export default function SpellSlot({ isChecked, onPress }: SpellSlotProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isChecked ? <Ionicons name="md-close" size={32} color="black" /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: gap / 2,
    marginHorizontal: gap / 2,
  },
});
