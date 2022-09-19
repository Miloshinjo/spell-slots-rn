import { Box, Container } from 'native-base';

import SpellSlots from '../components/spell-slots/SpellSlots';

export default function Home() {
  return (
    <Box flex="1" safeArea>
      <SpellSlots />
    </Box>
  );
}
