import { Box, Text, Input } from "@chakra-ui/react";
import React from "react";
import { FieldError, ControllerRenderProps } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDateInput = React.forwardRef<HTMLInputElement, any>(
  ({ value, onClick, placeholder, ...props }, ref) => (
    <Input
      {...props}
      ref={ref}
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      readOnly
      cursor="pointer"
      _focus={{
        borderColor: "blue.500",
        boxShadow: "0 0 0 1px blue.500",
      }}
    />
  )
);
interface DateFieldProps {
  label: string;
  error?: FieldError;
  field: ControllerRenderProps<any, any>;
}

export const DateField = ({ label, error, field }: DateFieldProps) => (
  <Box>
    <Text mb={2} fontWeight="medium" color="gray.700">
      {label}
    </Text>
    <DatePicker
      selected={field.value}
      onChange={field.onChange}
      customInput={<CustomDateInput />}
      dateFormat="dd/MM/yyy"
      placeholderText="DD/MM/YYY"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      yearDropdownItemNumber={100}
      maxDate={new Date()}
      popperClassName="custom-datepicker"
    />
    {error && (
      <Text color="red" fontSize="sm" mt={1}>
        {error.message}
      </Text>
    )}
  </Box>
);
