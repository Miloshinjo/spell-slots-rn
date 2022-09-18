import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SpellSlot from './SpellSlot';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    <View style={styles.container}>
      <View
        style={[
          styles.headingContainer,
          isEditMode ? { borderWidth: 1 } : { borderWidth: 0 },
        ]}
      >
        <Text style={styles.headingText}>Level {level}</Text>
        {isEditMode && (
          <View style={styles.editButtonsContainer}>
            <TouchableOpacity
              accessibilityLabel="Remove a spell slot"
              style={styles.button}
              onPress={() => removeSlot(levelIndex)}
            >
              <Ionicons name="md-remove" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Add a spell slot"
              style={styles.button}
              onPress={() => addSlot(levelIndex)}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </TouchableOpacity>
          </View>
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
    paddingBottom: 12,
  },
  headingContainer: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  editButtonsContainer: {
    flexDirection: 'row',
  },
  headingText: {
    fontSize: 18,
    paddingRight: 12,
    // fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 4,
    width: 40,
    backgroundColor: '#BE4BDB',
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
