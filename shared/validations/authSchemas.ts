import * as Yup from "yup";

export const validationRegisterSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "First name cannot contain numbers or special characters"
    )
    .required("Name is required"),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "First name cannot contain numbers or special characters"
    )
    .required("Last name is required"),
});

export const validationLoginSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username or email must be at least 3 characters")
    .max(50, "Username or email must be at most 50 characters")
    .required("Username or email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export const validationAccountDetailsSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "First name cannot contain numbers or special characters"
    )
    .required("First name is required"),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "Last name cannot contain numbers or special characters"
    )
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters")
    .required("Email is required"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Birth date cannot be in the future")
    .test("minimum-age", "You must be at least 18 years old", function (value) {
      if (!value) return false;
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
      return value <= minAgeDate;
    }),
});
