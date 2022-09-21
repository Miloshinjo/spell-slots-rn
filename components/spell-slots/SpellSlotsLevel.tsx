import SpellSlot from './SpellSlot';
import { MaterialIcons } from '@expo/vector-icons';

import { Box, Button, Flex, Heading, HStack, Icon } from 'native-base';

interface SpellSlotsLevelProps {
  isEditMode: boolean;
  level: number;
  slots: Array<boolean>;
  toggleSlot: (levelIndex: number, slotIndex: number) => void;
  addSlot: (level: number) => void;
  removeSlot: (level: number) => void;
}

export default function SpellSlotsLevel({
  isEditMode,
  addSlot,
  removeSlot,
  level,
  slots,
  toggleSlot,
}: SpellSlotsLevelProps) {
  return (
    <Box mb="4">
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb="1"
      >
        <Heading fontSize="lg" py="2">
          {isEditMode && `(${slots.length}) `}Level {level}
        </Heading>
        {isEditMode && (
          <HStack>
            <Button
              leftIcon={<Icon size="sm" as={MaterialIcons} name="remove" />}
              colorScheme="black"
              variant="outline"
              size="sm"
              onPress={() => removeSlot(level)}
              mr="2"
            >
              Remove slot
            </Button>
            <Button
              leftIcon={<Icon size="sm" as={MaterialIcons} name="add" />}
              colorScheme="black"
              variant="outline"
              size="sm"
              onPress={() => addSlot(level)}
            >
              Add slot
            </Button>
          </HStack>
        )}
      </Flex>
      <Flex direction="row" wrap="wrap">
        {slots.map((isChecked, slotIndex) => {
          return (
            <SpellSlot
              key={slotIndex}
              isChecked={isChecked}
              onPress={() => toggleSlot(level, slotIndex)}
              isDisabled={isEditMode}
            />
          );
        })}
      </Flex>
    </Box>
  );
}
