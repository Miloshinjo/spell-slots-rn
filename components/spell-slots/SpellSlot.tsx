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
  const fadeAnim = useRef(new Animated.Value(isChecked ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const shrink = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const enlarge = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isChecked) {
      enlarge();
      fadeIn();
    } else {
      shrink();
      fadeOut();
    }
  }, [isChecked]);

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
      borderColor={isDisabled ? 'black' : 'black'}
      icon={
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Icon size="lg" as={MaterialIcons} name="close" />
        </Animated.View>
      }
      disabled={isDisabled}
      opacity={isDisabled ? '.2' : '1'}
    />
  );
}
