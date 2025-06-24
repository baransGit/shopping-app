import { Box, Input, Text, InputGroup, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FieldError } from "react-hook-form";

interface PasswordFieldProps {
  label: string;
  error?: FieldError;
  inputProps: any;
}

export const PasswordField = ({
  label,
  error,
  inputProps,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <Text mb={2} fontWeight="medium" color="gray.700">
        {label}
      </Text>
      <Box position="relative">
        <Input
          {...inputProps}
          type={showPassword ? "text" : "password"}
          pr="4.5rem"
        />
        <Button
          position="absolute"
          right="0.5rem"
          top="50%"
          transform="translateY(-50%)"
          size="sm"
          variant="ghost"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </Button>
      </Box>
      {error && (
        <Text color="red" fontSize="sm" mt={1}>
          {error.message}
        </Text>
      )}
    </Box>
  );
};
