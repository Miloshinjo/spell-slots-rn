import { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import SpellSlotsLevel from './SpellSlotsLevel';
import useSpellSlotsState from './useSpellSlotsState';
import { colors } from '../../styles/designSystem';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  StatusBar,
  Switch,
  VStack,
  ScrollView,
  Icon,
} from 'native-base';

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

  const handleSwitchEditMode = () => {
    setEditMode(!isEditMode);
  };

  return (
    <Box flex="1">
      <Flex direction="row" justifyContent="space-between" p="4">
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ height: 40, width: 40 }}
          />
        </View>
        <HStack alignItems="center" space={4}>
          <Text>Edit</Text>
          <Switch value={isEditMode} onChange={handleSwitchEditMode} />
        </HStack>
      </Flex>

      {isEditMode && (
        <HStack p="4" justifyContent="space-between">
          <Button
            leftIcon={<Icon size="sm" as={MaterialIcons} name="remove" />}
            colorScheme="black"
            variant="outline"
            onPress={removeLevel}
          >
            Remove Level
          </Button>
          <Button
            leftIcon={<Icon size="sm" as={MaterialIcons} name="add" />}
            colorScheme="black"
            variant="outline"
            onPress={addLevel}
          >
            Add Level
          </Button>
        </HStack>
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
              onPress={() => {
                setEditMode(true);
              }}
            >
              Start Editing
            </Button>
          </View>
        )
      ) : (
        <ScrollView px="4" showsVerticalScrollIndicator={false} pb="24">
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
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  heading: {
    marginLeft: 8,
  },
});
