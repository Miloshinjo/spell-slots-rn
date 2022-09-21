import React, { useEffect, useRef } from 'react';
import { Animated, Easing, GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Icon, IconButton } from 'native-base';

interface SpellSlotProps {
  isChecked: boolean;
  isDisabled: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export default function SpellSlot({
  isChecked,
  isDisabled,
  onPress,
}: SpellSlotProps) {
  return (
    <IconButton
      mb="2"
      mr="2"
      width={10}
      height={10}
      variant="subtle"
      colorScheme="gray"
      onPress={onPress}
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
