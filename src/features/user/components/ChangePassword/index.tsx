import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Heading, Stack, Button } from "@chakra-ui/react";
import { toaster } from "../../../../components/ui/toaster";

import { validationChangePasswordSchema } from "../../../../../shared/validations/authSchemas";
import { PasswordField } from "../../../../shared/components/custom-components-chakra/PasswordField";
import { useAuth } from "../../../auth/hooks/useAuth";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export const ChangePasswordForm = () => {
  const { updatePassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(validationChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = (data: ChangePasswordFormData) => {
    const { currentPassword, newPassword } = data;
    updatePassword.mutateAsync(
      { currentPassword, newPassword },
      {
        onSuccess: (response) => {
          reset();
          toaster.create({
            title: "Success",
            description: response.message || "Password changed successfully.",
            type: "success",
          });
        },
        onError: (error: any) => {
          toaster.create({
            title: "Error",
            description: error.message || "Failed to change password.",
            type: "error",
          });
        },
      }
    );
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
        Change Password
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <PasswordField
            label="Current Password"
            error={errors.currentPassword}
            inputProps={{
              ...register("currentPassword"),
              type: "password",
            }}
          />

          <PasswordField
            label="New Password"
            error={errors.newPassword}
            inputProps={{
              ...register("newPassword"),
              type: "password",
            }}
          />

          <PasswordField
            label="Confirm New Password"
            error={errors.confirmNewPassword}
            inputProps={{
              ...register("confirmNewPassword"),
              type: "password",
            }}
          />

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            loading={isSubmitting}
            mt={4}
          >
            Change Password
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
