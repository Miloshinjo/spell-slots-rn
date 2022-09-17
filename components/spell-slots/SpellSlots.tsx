import { useState } from 'react';
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import SpellSlotsLevel from './SpellSlotsLevel';
import useSpellSlotsState from './useSpellSlotsState';

export default function SpellSlots() {
  const [isEditMode, setEditMode] = useState(false);

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
      {isEditMode && (
        <View style={styles.addLevelButtons}>
          <Button title="Remove Level" onPress={removeLevel} />
          <Button title="Add Level" onPress={addLevel} />
        </View>
      )}

      <ScrollView>
        {spellSlotsLevels.map((slots, levelIndex) => {
          return (
            <SpellSlotsLevel
              isEditMode={isEditMode}
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
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 60,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}
        onPress={() => setEditMode((p) => !p)}
      >
        <Ionicons name="md-pencil" size={32} color="black" />
      </TouchableOpacity>
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
