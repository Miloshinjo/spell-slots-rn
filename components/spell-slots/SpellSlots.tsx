import { useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import {
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

import useSlotsStore from './useStore';
import SpellSlotsLevel from './SpellSlotsLevel';

export default function SpellSlots() {
  const [isEditMode, setEditMode] = useState(false);

  const addLevelZustand = useSlotsStore((state) => state.addLevel);
  const removeLevelZustand = useSlotsStore((state) => state.removeLevel);
  const numberOfLevels = useSlotsStore((state) => state.levels.length);

  const isAtMaxLevel = numberOfLevels >= MAX_LEVEL_LIMIT;

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
            onPress={removeLevelZustand}
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
            onPress={addLevelZustand}
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
            {[...Array(numberOfLevels).keys()].map((_, i) => {
              return (
                <SpellSlotsLevel
                  key={i}
                  isEditMode={isEditMode}
                  levelIndex={i}
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
        <ClearSlots />
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
