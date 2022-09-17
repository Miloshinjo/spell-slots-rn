import { Button, View, StyleSheet, ScrollView } from 'react-native';

import SpellSlotsLevel from './SpellSlotsLevel';
import useSpellSlotsState from './useSpellSlotsState';

export default function SpellSlots() {
  const {
    spellSlotsLevels,
    addLevel,
    removeLevel,
    toggleSlot,
    addSlot,
    removeSlot,
  } = useSpellSlotsState();

  return (
    <View style={styles.container}>
      <View style={styles.addLevelButtons}>
        <Button title="Remove Level" onPress={removeLevel} />
        <Button title="Add Level" onPress={addLevel} />
      </View>

      <ScrollView>
        {spellSlotsLevels.map((slots, levelIndex) => {
          return (
            <SpellSlotsLevel
              addSlot={addSlot}
              removeSlot={removeSlot}
              key={levelIndex}
              toggleSlot={toggleSlot}
              level={levelIndex + 1}
              slots={slots}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flex: 1,
  },
  addLevelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
});
