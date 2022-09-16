import { Platform, StatusBar, StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  androidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
