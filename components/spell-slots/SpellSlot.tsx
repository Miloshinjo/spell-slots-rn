import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { Icon } from 'native-base';

interface SpellSlotProps {
  isChecked: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export default function SpellSlot({ isChecked, onPress }: SpellSlotProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isChecked ? (
        <Icon size="lg" as={MaterialIcons} name="close" color="secondary.600" />
      ) : null}
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

    marginHorizontal: 3,
    marginBottom: 4,
  },
});
