import { Button, Stack, Box, Heading } from "@chakra-ui/react";
import * as yup from "yup";
import { useState } from "react";
import { isValidLuhnNumber } from "../../utils/controlCard";
import { TextField } from "../../../../shared/components/custom-components-chakra/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface CardFormData {
  cardNumber: string;
  expirtyDate: string;
  cvv: string;
  cardHolderName: string;
}

const cardSchema = yup.object({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .test("luhn", "Invalid card number", (value) => {
      return isValidLuhnNumber(value);
    }),
  expirtyDate: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .test("not-expired", "Card has expired", (value) => {
      const [month, year] = value.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "CVV must be 3 digits"),
  cardHolderName: yup
    .string()
    .required("Card holder name is required")
    .min(2, "Name too short"),
});

export const PaymentMethodsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CardFormData>({
    resolver: yupResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      expirtyDate: "",
      cvv: "",
      cardHolderName: "",
    },
  });
  const onSubmit = (data: CardFormData) => {};

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
        Payment Methods
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <TextField
            label="Card Number"
            error={errors.cardNumber}
            inputProps={register("cardNumber")}
          />

          <TextField
            label="Cardholder Name"
            error={errors.cardHolderName}
            inputProps={register("cardHolderName")}
          />

          <Stack direction="row" gap={4}>
            <TextField
              label="Expiry Date (MM/YY)"
              error={errors.expirtyDate}
              inputProps={register("expirtyDate")}
            />
            <Box width="120px">
              <TextField
                label="CVV"
                error={errors.cvv}
                inputProps={register("cvv")}
              />
            </Box>
          </Stack>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            loading={isSubmitting}
            mt={4}
          >
            Save Payment Method
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
