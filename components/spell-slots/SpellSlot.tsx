import React, { memo } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { Icon, IconButton } from 'native-base';
import useSlotsStore from './useSlotsStore';

interface SpellSlotProps {
  isChecked: boolean;
  isDisabled: boolean;
  levelIndex: number;
  slotIndex: number;
}

function SpellSlot({
  isChecked,
  isDisabled,
  levelIndex,
  slotIndex,
}: SpellSlotProps) {
  const toggleSlot = useSlotsStore((state) => state.toggleSlot);

  function handlePress() {
    toggleSlot(levelIndex, slotIndex);
  }

  return (
    <IconButton
      accessibilityLabel="Toggle spell slot"
      mb="2"
      mr="2"
      width={10}
      height={10}
      variant="subtle"
      colorScheme="gray"
      onPress={handlePress}
      borderWidth="1"
      borderColor="black"
      icon={
        isChecked ? (
          <Icon size="lg" as={MaterialIcons} name="close" />
        ) : undefined
      }
      disabled={isDisabled}
      opacity={isDisabled ? '.3' : '1'}
    />
  );
}

export default memo(SpellSlot);
