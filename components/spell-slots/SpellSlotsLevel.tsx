import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SpellSlot from './SpellSlot';

interface SpellSlotsLevelProps {
  level: number;
  slots: Array<boolean>;
  toggleSlot: (levelIndex: number, slotIndex: number) => void;
  addSlot: (levelIndex: number) => void;
  removeSlot: (levelIndex: number) => void;
}

export default function SpellSlotsLevel({
  addSlot,
  removeSlot,
  level,
  slots,
  toggleSlot,
}: SpellSlotsLevelProps) {
  const levelIndex = level - 1;

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Level {level}</Text>
        <View style={styles.editButtonsContainer}>
          <TouchableOpacity
            accessibilityLabel="Remove a spell slot"
            style={styles.button}
            onPress={() => removeSlot(levelIndex)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Add a spell slot"
            style={styles.button}
            onPress={() => addSlot(levelIndex)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 12,
  },
  headingContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 24,
    paddingRight: 12,
  },
  button: {
    paddingHorizontal: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 4,
    width: 40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  spellSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  editButtonsContainer: {
    flexDirection: 'row',
  },
});
