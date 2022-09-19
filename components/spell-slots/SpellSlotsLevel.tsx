import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SpellSlot from './SpellSlot';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../../styles/designSystem';
import { AddIcon, HStack, Icon, IconButton, MinusIcon } from 'native-base';

interface SpellSlotsLevelProps {
  isEditMode: boolean;
  level: number;
  slots: Array<boolean>;
  toggleSlot: (levelIndex: number, slotIndex: number) => void;
  addSlot: (levelIndex: number) => void;
  removeSlot: (levelIndex: number) => void;
}

export default function SpellSlotsLevel({
  isEditMode,
  addSlot,
  removeSlot,
  level,
  slots,
  toggleSlot,
}: SpellSlotsLevelProps) {
  const levelIndex = level - 1;

  return (
    <View
      style={[
        styles.container,
        isEditMode ? { borderWidth: 1 } : { borderWidth: 0 },
      ]}
    >
      <View style={[styles.headingContainer]}>
        <Text style={styles.headingText}>Level {level}</Text>
        {isEditMode && (
          <HStack>
            <IconButton
              accessibilityLabel="Remove a spell slot"
              icon={<MinusIcon />}
              onPress={() => removeSlot(levelIndex)}
            />
            <IconButton
              accessibilityLabel="Remove a spell slot"
              icon={<AddIcon />}
              onPress={() => addSlot(levelIndex)}
            />
          </HStack>
        )}
      </View>
      <View style={styles.spellSlots}>
        {slots.map((isChecked, slotIndex) => {
          return (
            <SpellSlot
              key={slotIndex}
              isChecked={isChecked}
              onPress={() => toggleSlot(levelIndex, slotIndex)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderStyle: 'dashed',
  },
  headingContainer: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headingText: {
    fontSize: 18,
    paddingRight: 12,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  spellSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
