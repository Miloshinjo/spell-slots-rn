import { Flex, Image } from 'native-base';

export default function Header() {
  return (
    <Flex direction="row" justifyContent="space-between" px="4">
      <Image
        source={require('../assets/images/logo-full.png')}
        width="40"
        height="20"
        alt="Logo"
        resizeMode="contain"
      />
    </Flex>
  );
}
