import { Box, Container } from 'native-base';
import Header from '../components/Header';

import SpellSlots from '../components/spell-slots/SpellSlots';

export default function Home() {
  return (
    <Box flex="1" safeArea>
      <Header />
      <SpellSlots />
    </Box>
  );
}
