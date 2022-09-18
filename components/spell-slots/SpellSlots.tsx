import { useState } from 'react';
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
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
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ height: 40, width: 40 }}
          />
          <Text style={styles.heading}>Spell Slots</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.editButton,
            isEditMode
              ? {
                  borderColor: '#BE4BDB',
                }
              : {
                  borderColor: 'transparent',
                },
          ]}
          onPress={() => setEditMode((prevState) => !prevState)}
        >
          <Ionicons
            name="create-outline"
            size={24}
            color={isEditMode ? '#BE4BDB' : 'black'}
          />
        </TouchableOpacity>
      </View>
      {isEditMode && (
        <View style={styles.addLevelButtons}>
          <Button color="#BE4BDB" title="Remove Level" onPress={removeLevel} />
          <Button color="#BE4BDB" title="Add Level" onPress={addLevel} />
        </View>
      )}

      {spellSlotsLevels.length === 0 ? (
        !isEditMode && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Button
              color="#BE4BDB"
              title="Start Editing"
              onPress={() => {
                setEditMode(true);
              }}
            />
          </View>
        )
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  heading: {
    fontSize: 20,
    marginLeft: 8,
  },
  addLevelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  editButton: {
    alignSelf: 'center',
    padding: 6,
  },
});
