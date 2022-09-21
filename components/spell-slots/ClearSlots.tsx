import { Box, Button, Popover, Text } from 'native-base';
import { useState } from 'react';
import type { GestureResponderEvent } from 'react-native';

type ClearSlotsProps = {
  isDisabled: boolean;
  clearSlots: () => void;
};

export default function ClearSlots({
  isDisabled,
  clearSlots,
}: ClearSlotsProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Box flex="1">
      <Popover
        isOpen={isOpen}
        trigger={(triggerProps) => {
          return (
            <Button
              {...triggerProps}
              variant="subtle"
              colorScheme="gray"
              alignItems="center"
              size="lg"
              py="4"
              borderRightWidth="1"
              borderRightColor="gray.300"
              borderRadius="0"
              disabled={isDisabled}
              opacity={isDisabled ? '.3' : '1'}
              onPress={() => {
                setOpen(true);
              }}
            >
              Clear
            </Button>
          );
        }}
      >
        <Popover.Content accessibilityLabel="Clear all slots" w="56">
          <Popover.Arrow />
          <Popover.CloseButton
            onPress={() => {
              setOpen(false);
            }}
          />
          <Popover.Header>Clear all slots</Popover.Header>
          <Popover.Body>This will clear all used up slots.</Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  setOpen(false);
                }}
                colorScheme="coolGray"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setOpen(false);
                  clearSlots();
                }}
                colorScheme="info"
              >
                Yes, clear All
              </Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
}
