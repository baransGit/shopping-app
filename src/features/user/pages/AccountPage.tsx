import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { AccountSidebar } from "../components/AccountSidebar";

export const AccountPage = () => {
  return (
    <Flex gap={6} p={6}>
      {/* Sol tarafta sidebar */}
      <AccountSidebar />

      {/* Sağ tarafta içerik */}
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
};
