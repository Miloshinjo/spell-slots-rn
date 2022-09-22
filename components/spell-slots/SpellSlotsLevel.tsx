import SpellSlot from './SpellSlot';
import { MaterialIcons } from '@expo/vector-icons';

import { Box, Button, Flex, Heading, HStack, Icon, Text } from 'native-base';
import useSlotsStore from './useStore';
import { memo } from 'react';
import { MAX_SLOTS_LIMIT } from '../../constants/preferences';

interface SpellSlotsLevelProps {
  isEditMode: boolean;
  levelIndex: number;
}

function SpellSlotsLevel({ isEditMode, levelIndex }: SpellSlotsLevelProps) {
  const slots = useSlotsStore((state) => state.levels[levelIndex]);
  const addSlot = useSlotsStore((state) => state.addSlot);
  const removeSlot = useSlotsStore((state) => state.removeSlot);
  const toggleSlot = useSlotsStore((state) => state.toggleSlot);

  const handleAddSlot = () => {
    addSlot(levelIndex);
  };

  const handleRemoveSlot = () => {
    removeSlot(levelIndex);
  };

  const isAddDisabled = slots.length >= MAX_SLOTS_LIMIT;
  const isRemoveDisabled = slots.length <= 1;

  return (
    <Box mb="4">
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb="1"
      >
        <Heading fontSize="lg" py="2">
          {isEditMode && `(${slots.length}) `}Level {levelIndex + 1}
        </Heading>
        {isEditMode && (
          <HStack>
            <Button
              leftIcon={<Icon size="sm" as={MaterialIcons} name="remove" />}
              colorScheme="black"
              variant="outline"
              size="sm"
              onPress={handleRemoveSlot}
              mr="2"
              disabled={isRemoveDisabled}
              opacity={isRemoveDisabled ? '0.3' : '1'}
            >
              {isRemoveDisabled ? 'Min ' : 'Remove slot'}
            </Button>
            <Button
              leftIcon={<Icon size="sm" as={MaterialIcons} name="add" />}
              colorScheme="black"
              variant="outline"
              size="sm"
              onPress={handleAddSlot}
              disabled={isAddDisabled}
              opacity={isAddDisabled ? '0.3' : '1'}
            >
              {isAddDisabled ? 'Max' : 'Add slot'}
            </Button>
          </HStack>
        )}
      </Flex>
      <Flex direction="row" wrap="wrap">
        {slots.map((isChecked, slotIndex) => {
          const handleToggleSlot = () => {
            toggleSlot(levelIndex, slotIndex);
          };
          return (
            <SpellSlot
              key={slotIndex}
              isChecked={isChecked}
              onPress={handleToggleSlot}
              isDisabled={isEditMode}
            />
          );
        })}
      </Flex>
    </Box>
  );
}

export default memo(SpellSlotsLevel);
