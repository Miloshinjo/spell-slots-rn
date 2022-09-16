import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SpellSlotProps {
  isChecked: boolean;
}

export default function SpellSlot({ isChecked }: SpellSlotProps) {
  return (
    <TouchableOpacity style={styles.container}>
      {isChecked ? <Ionicons name="md-close" size={32} color="black" /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: 40,
    height: 40,
  },
});
