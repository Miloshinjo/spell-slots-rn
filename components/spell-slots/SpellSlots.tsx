import { useState } from 'react';

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
import ClearSlots from './ClearSlots';
import { MAX_LEVEL_LIMIT } from '../../constants/preferences';

export default function SpellSlots() {
  const [isEditMode, setEditMode] = useState(false);

  const {
    spellSlotsLevels,
    addLevel,
    isFresh,
    isLoadingFromStorage,
    removeLevel,
    toggleSlot,
    addSlot,
    removeSlot,
    clearSlots,
  } = useSpellSlotsState();

  const isAtMaxLevel = spellSlotsLevels.size >= MAX_LEVEL_LIMIT;

  return (
    <Box flex="1">
      <Flex direction="row" justifyContent="space-between" px="4">
        <Image
          source={require('../../assets/images/logo-full.png')}
          width="40"
          height="20"
          alt="Logo"
          resizeMode="contain"
        />
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

      {spellSlotsLevels.size === 0 ? (
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
        <>
          <ScrollView px="4" showsVerticalScrollIndicator={false} pb="24">
            {Array.from(spellSlotsLevels).map(([level, slots]) => {
              return (
                <SpellSlotsLevel
                  isEditMode={isEditMode}
                  addSlot={addSlot}
                  removeSlot={removeSlot}
                  key={level}
                  toggleSlot={toggleSlot}
                  level={level}
                  slots={slots}
                />
              );
            })}
          </ScrollView>
        </>
      )}
      <Flex
        borderTopWidth={1}
        borderTopColor="gray.300"
        flexDirection="row"
        mt="auto"
      >
        <ClearSlots isDisabled={isFresh} clearSlots={clearSlots} />
        <Button
          variant={isEditMode ? 'solid' : 'subtle'}
          colorScheme={isEditMode ? 'primary' : 'gray'}
          flex="1"
          size="lg"
          alignItems="center"
          borderRadius="none"
          py="4"
          onPress={() => setEditMode((p) => !p)}
        >
          {isEditMode ? 'Save' : 'Edit'}
        </Button>
      </Flex>
    </Box>
  );
}

[[false, false, true], [true, true], [false]];
