import { ROUTES } from "../../../app/constants/routes";
import {
  FaUser,
  FaLock,
  FaAddressBook,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";

import { IconType } from "react-icons/lib";

export interface SidebarMenuItem {
  label: string;
  to?: string;
  icon: IconType;
  hasSignOut?: boolean;
}
export const accountSidebarMenu: SidebarMenuItem[] = [
  {
    label: "My Details",
    to: ROUTES.ACCOUNT.DETAILS,
    icon: FaUser,
  },
  {
    label: "Change Password",
    to: ROUTES.ACCOUNT.CHANGE_PASSWORD,
    icon: FaLock,
  },
  {
    label: "Address Book",
    to: ROUTES.ACCOUNT.ADDRESS_BOOK,
    icon: FaAddressBook,
  },
  {
    label: "Payment Methods",
    to: ROUTES.ACCOUNT.PAYMENT_METHODS,
    icon: FaCreditCard,
  },
  {
    label: "Sign Out",
    icon: FaSignOutAlt,
    hasSignOut: true,
  },
];
