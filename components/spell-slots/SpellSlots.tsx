import { useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { Box, Button, HStack, Icon, Center, FlatList } from 'native-base';

import { MAX_LEVEL_LIMIT } from '../../constants/preferences';

import useSlotsStore from './useSlotsStore';
import SpellSlotsLevel from './SpellSlotsLevel';
import BottomMenu from './BottomMenu';

export default function SpellSlots() {
  const [isEditMode, setEditMode] = useState(false);

  const addLevel = useSlotsStore((state) => state.addLevel);
  const removeLevel = useSlotsStore((state) => state.removeLevel);
  const numberOfLevels = useSlotsStore((state) => state.levels.length);

  const isAtMaxLevel = numberOfLevels >= MAX_LEVEL_LIMIT;

  function handleSetEditMode() {
    setEditMode(true);
  }

  function handleToggleEditMode() {
    setEditMode((p) => !p);
  }

  return (
    <Box flex="1">
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
            leftIcon={
              isAtMaxLevel ? undefined : (
                <Icon size="sm" as={MaterialIcons} name="add" />
              )
            }
            colorScheme="black"
            variant="outline"
            onPress={addLevel}
            disabled={isAtMaxLevel}
            opacity={isAtMaxLevel ? '0.3' : '1'}
          >
            {isAtMaxLevel ? 'Max level reached' : 'Add Level'}
          </Button>
        </HStack>
      )}

      {numberOfLevels === 0 ? (
        !isEditMode && (
          <Center flex="1">
            <Button onPress={handleSetEditMode}>Start Editing</Button>
          </Center>
        )
      ) : (
        <FlatList
          px="4"
          pb="24"
          showsVerticalScrollIndicator={false}
          data={[...Array(numberOfLevels).keys()]}
          renderItem={(item) => (
            <SpellSlotsLevel isEditMode={isEditMode} levelIndex={item.index} />
          )}
        />
      )}

      <BottomMenu
        isEditMode={isEditMode}
        toggleEditMode={handleToggleEditMode}
      />
    </Box>
  );
}
