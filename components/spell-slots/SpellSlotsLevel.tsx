import SpellSlot from './SpellSlot';
import { MaterialIcons } from '@expo/vector-icons';

import {
  AddIcon,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  MinusIcon,
} from 'native-base';

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
              onPress={() => removeSlot(levelIndex)}
              mr="2"
            >
              Remove slot
            </Button>
            <Button
              leftIcon={<Icon size="sm" as={MaterialIcons} name="add" />}
              colorScheme="black"
              variant="outline"
              size="sm"
              onPress={() => addSlot(levelIndex)}
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
              onPress={() => toggleSlot(levelIndex, slotIndex)}
              isDisabled={isEditMode}
            />
          );
        })}
      </Flex>
    </Box>
  );
}
