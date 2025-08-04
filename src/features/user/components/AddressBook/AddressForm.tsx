import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAddress } from "../../types";
import { Box, Text, Input, Button, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUserProfile } from "../../hooks/useUser";
import { useAuth } from "../../../auth/hooks/useAuth";
import {
  AddressAutocomplete,
  NominatimAddress,
} from "../../../../shared/components/custom-components-chakra/AddressAutocomplete";

interface AddressFormData {
  fullName: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  zip: string;
}

interface AddressFormProps {
  address?: UserAddress;
  isEdited?: boolean;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  address: propAddress,
  isEdited,
}) => {
  const navigate = useNavigate();
  const { addressId } = useParams();
  const isEditMode = isEdited || Boolean(addressId);
  const { addAddress, updateAddress } = useUserProfile();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddressFormData>({
    defaultValues: {
      fullName: propAddress?.fullName || "",
      street: propAddress?.street || "",
      city: propAddress?.city || "",
      state: propAddress?.state || "",
      country: propAddress?.country || "",
      zip: propAddress?.zip || "",
    },
  });

  const { user, isLoading } = useAuth();
  const addressData = user?.addressBook?.find((addr) => addr.id === addressId);

  useEffect(() => {
    if (addressData) {
      setValue("fullName", addressData.fullName);
      setValue("street", addressData.street);
      setValue("city", addressData.city);
      setValue("state", addressData.state);
      setValue("country", addressData.country);
      setValue("zip", addressData.zip);
    }
  }, [addressData, setValue]);

  const handleAddressSelect = (selectedAddress: NominatimAddress) => {
    const addressParts = selectedAddress.display_name.split(", ");
    const country = addressParts[addressParts.length - 1];
    const city = addressParts[addressParts.length - 2] || "";
    const street = addressParts.slice(0, -2).join(", ");

    setValue("street", street);
    setValue("city", city);
    setValue("country", country);
  };

  const onSubmit = async (data: AddressFormData) => {
    try {
      const addressData: UserAddress = isEditMode
        ? {
            id: addressId || propAddress?.id || "", // Edit modunda ID var
            ...data,
            state: data.state || "",
          }
        : {
            ...data, // Add modunda ID YOK!
            state: data.state || "",
          };

      if (isEditMode) {
        await updateAddress.mutateAsync(addressData);
      } else {
        await addAddress.mutateAsync(addressData);
      }
      navigate("../");
    } catch (error) {
      console.error("Error saving address:", error);
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
    <Box>
      <Text fontSize="2xl" mb={4}>
        {isEditMode ? "Edit Address" : "Add New Address"}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <AddressAutocomplete
            placeholder="Search your address..."
            width="400px"
            onSelect={handleAddressSelect}
          />
        </Box>

        <Box mt={5} display="flex" flexDirection="column" gap={3}>
          <Box>
            <Text mb={2}>Full Name:</Text>
            <Input
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <Text color="red.500" fontSize="sm">
                {errors.fullName.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2}>Street:</Text>
            <Input
              {...register("street", { required: "Street is required" })}
              placeholder="Enter street address"
            />
            {errors.street && (
              <Text color="red.500" fontSize="sm">
                {errors.street.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2}>City:</Text>
            <Input
              {...register("city", { required: "City is required" })}
              placeholder="Enter city"
            />
            {errors.city && (
              <Text color="red.500" fontSize="sm">
                {errors.city.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2}>State (Optional):</Text>
            <Input
              {...register("state")}
              placeholder="Enter state (if applicable)"
            />
            {errors.state && (
              <Text color="red.500" fontSize="sm">
                {errors.state.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2}>Country:</Text>
            <Input
              {...register("country", { required: "Country is required" })}
              placeholder="Enter country"
            />
            {errors.country && (
              <Text color="red.500" fontSize="sm">
                {errors.country.message}
              </Text>
            )}
          </Box>

          <Box>
            <Text mb={2}>ZIP Code:</Text>
            <Input
              {...register("zip", { required: "ZIP code is required" })}
              placeholder="Enter ZIP code"
            />
            {errors.zip && (
              <Text color="red.500" fontSize="sm">
                {errors.zip.message}
              </Text>
            )}
          </Box>
        </Box>

        <Button
          mt={4}
          colorScheme="blue"
          type="submit"
          disabled={addAddress.isPending || updateAddress.isPending}
        >
          Save Address
        </Button>
      </form>
    </Box>
  );
};
