import { SafeAreaView, StyleSheet, Text } from 'react-native';

import SpellSlots from '../components/spell-slots/SpellSlots';
import { commonStyles } from '../styles/common';

export default function Home() {
  return (
    <SafeAreaView style={[commonStyles.androidSafeArea, styles.container]}>
      <SpellSlots />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
