import { useNavigation } from "../../../../shared/hooks/useNavigation";
import { UserAddress } from "../../types";
import { SavedAddress } from "./SavedAddress";
import { Box, Heading, Button, VStack, Spinner } from "@chakra-ui/react";
import { useUserProfile } from "../../hooks/useUser";
import { toaster } from "../../../../components/ui/toaster";

export const AddressBook = () => {
  const { user, deleteAddress, isLoading } = useUserProfile();
  const navigate = useNavigation();

  console.log("User in AddressBook:", JSON.stringify(user, null, 2));
  console.log(
    "AddressBook in user:",
    JSON.stringify(user?.addressBook, null, 2)
  );

  const handleAddAddress = () => {
    navigate.goToAddAddress();
  };

  const handleEdit = (id: string) => {
    navigate.goToEditAddress(id);
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) {
        toaster.create({
          title: "Error",
          description: "Invalid address ID",
          type: "error",
        });
        return;
      }
      await deleteAddress.mutateAsync(id);
      toaster.create({
        title: "Success",
        description: "Address deleted successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Delete address failed:", error);
      toaster.create({
        title: "Error",
        description: "Failed to delete address. Please try again.",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      maxW="500px"
      mx="auto"
      w={"300px"}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      shadow="lg"
    >
      <VStack gap={4} align="stretch">
        <Heading size="lg" textAlign="center" color="blue.600">
          Address Book
        </Heading>

        <Button colorScheme="blue" onClick={handleAddAddress}>
          Add New Address
        </Button>

        {user?.addressBook?.map((address) => (
          <SavedAddress
            key={address.id}
            address={address}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </VStack>
    </Box>
  );
};
