import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';

import Home from './screens/Home';

export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      // primary: {
      //   50: '#fff7ed',
      //   100: '#ffedd5',
      //   200: '#fed7aa',
      //   300: '#fdba74',
      //   400: '#fb923c',
      //   500: '#f97316',
      //   600: '#ea580c',
      //   700: '#c2410c',
      //   800: '#9a3412',
      //   900: '#7c2d12',
      // },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Home />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
