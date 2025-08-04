import { VStack, Link as ChakraLink, Box } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/hooks/useAuth";
import { accountSidebarMenu } from "../../utils/sidebarMenu";

export const AccountSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleSignOut = async () => {
    try {
      await logout.mutateAsync();
      navigate("/login");
    } catch (error) {
      console.log("logout is unsuccessfull");
    }
  };
  return (
    <VStack align="stretch" gap={2} minW="200px" p={4}>
      {accountSidebarMenu.map((item, index) => {
        const Icon = item.icon;
        const isActive = item.to && location.pathname === item.to;

        return item.hasSignOut ? (
          <ChakraLink
            as="button"
            key={`${item.label}-${index}`}
            display="flex"
            alignItems="center"
            color="red.500"
            fontWeight="bold"
            onClick={handleSignOut}
            borderRadius="md"
            px={3}
            py={2}
            _hover={{ bg: "red.50", textDecoration: "none" }}
          >
            <Box mr={2}>
              <Icon />
            </Box>
            {item.label}
          </ChakraLink>
        ) : (
          <Link key={`${item.label}-${index}`} to={item.to!}>
            <ChakraLink
              key={item.label}
              display="flex"
              alignItems="center"
              fontWeight={isActive ? "bold" : "normal"}
              bg={isActive ? "blue.50" : "transparent"}
              color={isActive ? "blue.600" : "gray.700"}
              borderRadius="md"
              px={3}
              py={2}
              _hover={{ bg: "blue.100", textDecoration: "none" }}
            >
              <Box mr={2}>
                <Icon />
              </Box>
              {item.label}
            </ChakraLink>
          </Link>
        );
      })}
    </VStack>
  );
};
