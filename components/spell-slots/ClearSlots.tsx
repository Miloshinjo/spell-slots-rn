import { Box, Button, Popover } from 'native-base';
import { useState } from 'react';
import useSlotsStore from './useSlotsStore';

export default function ClearSlots() {
  const [isOpen, setOpen] = useState(false);

  const isFresh = !useSlotsStore((state) =>
    state.levels.flat().some((slot) => slot === true)
  );

  const clearSlots = useSlotsStore((state) => state.clearSlots);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClearAll() {
    clearSlots();
    handleClose();
  }

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
              disabled={isFresh}
              opacity={isFresh ? '.3' : '1'}
              onPress={handleOpen}
            >
              Clear
            </Button>
          );
        }}
      >
        <Popover.Content accessibilityLabel="Clear all slots" w="56">
          <Popover.Arrow />
          <Popover.CloseButton
            accessibilityLabel="Close popup"
            onPress={handleClose}
          />
          <Popover.Header>Clear all slots</Popover.Header>
          <Popover.Body>This will clear all used up slots.</Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button.Group space={2}>
              <Button
                onPress={handleClose}
                colorScheme="coolGray"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button onPress={handleClearAll} colorScheme="info">
                Yes, clear All
              </Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
}
