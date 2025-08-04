import { Box, Input, Text } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface TextFieldProps {
  label: string;
  error?: FieldError;
  inputProps: any;
}

export const TextField = ({ label, error, inputProps }: TextFieldProps) => (
  <Box>
    <Text mb={2} fontWeight="medium" color="gray.700">
      {label}
    </Text>
    <Input
      {...inputProps}
      _focus={{
        borderCOlor: "blue.500",
        boxShadow: "0 0 0 1px blue.500",
      }}
    />
    {error && (
      <Text color="red" fontSize="sm" mt={1}>
        {error.message}
      </Text>
    )}
  </Box>
);
