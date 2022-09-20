import { useState } from 'react';
import { Switch as ReactNativeSwitch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import SpellSlotsLevel from './SpellSlotsLevel';
import useSpellSlotsState from './useSpellSlotsState';

import {
  Text,
  Box,
  Button,
  Flex,
  HStack,
  ScrollView,
  Icon,
  Center,
  Image,
} from 'native-base';

export default function SpellSlots() {
  const [isEditMode, setEditMode] = useState(false);

  const {
    spellSlotsLevels,
    addLevel,
    isLoadingFromStorage,
    removeLevel,
    toggleSlot,
    addSlot,
    removeSlot,
  } = useSpellSlotsState();

  const handleSwitchEditMode = () => {
    setEditMode((p) => !p);
  };

  return (
    <Box flex="1">
      <Flex direction="row" justifyContent="space-between" p="4">
        <Box>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ height: 50, width: 50 }}
            alt="Logo"
          />
        </Box>
        <HStack alignItems="center" space={4}>
          <Text>Edit</Text>
          <ReactNativeSwitch
            trackColor={{
              true: '#67E8F9',
              false: '#ddd',
            }}
            thumbColor="#404040"
            value={isEditMode}
            onValueChange={handleSwitchEditMode}
          />
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
        !isEditMode &&
        !isLoadingFromStorage && (
          <Center flex="1">
            <Button
              onPress={() => {
                setEditMode(true);
              }}
            >
              Start Editing
            </Button>
          </Center>
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
