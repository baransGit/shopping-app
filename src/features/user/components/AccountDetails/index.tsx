import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Heading, Stack, Button } from "@chakra-ui/react";
import { toaster } from "../../../../components/ui/toaster";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { validationAccountDetailsSchema } from "../../../../../shared/validations/authSchemas";
import { AccountDetailsCredentials } from "../../types";
import { TextField } from "../../../../shared/components/custom-components-chakra/TextField";
import { DateField } from "../../../../shared/components/custom-components-chakra/DateField";
import { useAuth } from "../../../auth/hooks/useAuth";
import { useUserProfile } from "../../hooks/useUser";
export const AccountDetailsForm = () => {
  const { updateDetails } = useUserProfile();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AccountDetailsCredentials>({
    resolver: yupResolver(validationAccountDetailsSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
    },
  });

  // Update form when user data arrives
  React.useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: AccountDetailsCredentials) => {
    updateDetails.mutateAsync(data, {
      onSuccess: () => {
        toaster.create({
          title: "Success",
          description: "Account details updated successfully.",
          type: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (error: any) => {
        toaster.create({
          title: "Error",
          description: error.message || "Failed to update account details.",
          type: "error",
        });
      },
    });
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      p={6}
      borderWidth={1}
      borderRadius="lg"
      shadow="lg"
    >
      <Heading size="lg" mb={6} textAlign="center" color="blue.600">
        Account Details
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <TextField
            label="First Name"
            error={errors.firstName}
            inputProps={register("firstName")}
          />

          <TextField
            label="Last Name"
            error={errors.lastName}
            inputProps={register("lastName")}
          />
          <TextField
            label="Email Address"
            error={errors.email}
            inputProps={register("email")}
          />
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <DateField
                label="Date of Birth"
                error={errors.dateOfBirth}
                field={field}
              />
            )}
          />
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            loading={isSubmitting}
            mt={4}
          >
            Save Account Details
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
