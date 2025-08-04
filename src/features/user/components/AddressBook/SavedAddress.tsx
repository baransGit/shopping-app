import { Box, Text, Button } from "@chakra-ui/react";
import { UserAddress } from "../../types";
interface SavedAddressProps {
  address: UserAddress;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
export const SavedAddress: React.FC<SavedAddressProps> = ({
  address,
  onEdit,
  onDelete,
}) => {
  console.log("Address in SavedAddress:", address);
  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Text>{address.fullName}</Text>
      <Text>{address.street}</Text>
      <Text>{`${address.city}, ${address.state} ${address.zip}`}</Text>
      <Text>{address.country}</Text>
      <Button
        h={10}
        w={20}
        onClick={() => onEdit(address.id || "")}
        colorScheme="blue"
        mr={2}
      >
        Edit
      </Button>
      <Button
        h={10}
        w={20}
        onClick={() => onDelete(address.id || "")}
        colorScheme="red"
      >
        Delete
      </Button>
    </Box>
  );
};
