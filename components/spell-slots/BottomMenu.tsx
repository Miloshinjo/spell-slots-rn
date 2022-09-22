import { Button, Flex } from 'native-base';
import ClearSlots from './ClearSlots';

type Props = {
  isEditMode: boolean;
  toggleEditMode: () => void;
};

export default function BottomMenu({ isEditMode, toggleEditMode }: Props) {
  return (
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
        onPress={toggleEditMode}
      >
        {isEditMode ? 'Save' : 'Edit'}
      </Button>
    </Flex>
  );
}
