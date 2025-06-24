import React, { useState, useRef } from "react";
import { Input, Box } from "@chakra-ui/react";

// Address object type returned from Nominatim API
export interface NominatimAddress {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  importance: number;
}

interface AddressAutocompleteProps {
  onSelect?: (address: NominatimAddress) => void;
  placeholder?: string;
  width?: string;
}

// DEBOUNCE FUNCTION - Arrow function version
// Purpose: Delays function execution until user stops typing

const debounce = <T extends (...args: any[]) => void>(
  func: T, // The function to be delayed
  delay: number // Wait time in milliseconds
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>; // Stores the timeout ID

  // Return a new function that wraps the original function
  return (...args: Parameters<T>) => {
    // Clear previous timeout if user types again before delay ends
    clearTimeout(timeoutId);

    // Set new timeout - will execute func after delay
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onSelect,
  placeholder = "Search address...",
  width = "100%",
}) => {
  // STATE MANAGEMENT
  const [query, setQuery] = useState<string>(""); // User's input text
  const [results, setResults] = useState<NominatimAddress[]>([]); // API results
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // Show/hide dropdown
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  const inputRef = useRef<HTMLInputElement>(null); // Reference to input element

  // API SEARCH FUNCTION
  // This function calls the OpenStreetMap Nominatim API
  const searchAddresses = async (searchQuery: string): Promise<void> => {
    // Don't search if query is too short
    if (searchQuery.length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true); // Show loading state
    try {
      // Call Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=5&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data: NominatimAddress[] = await response.json();
      setResults(data); // Store results
      setShowDropdown(data.length > 0); // Show dropdown if we have results
    } catch (error) {
      console.error("Address search error:", error);
      setResults([]);
      setShowDropdown(false);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  // CREATE DEBOUNCED VERSION OF SEARCH FUNCTION
  // This will only call searchAddresses 400ms after user stops typing
  const debouncedSearch = useRef(debounce(searchAddresses, 400)).current;

  // EVENT HANDLERS
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value); // Update input value immediately
    debouncedSearch(value); // Call debounced search (waits 400ms)
  };

  const handleAddressSelect = (address: NominatimAddress): void => {
    setQuery(address.display_name); // Set selected address as input value
    setShowDropdown(false); // Hide dropdown
    setResults([]); // Clear results

    // Call parent component's onSelect callback if provided
    if (onSelect) {
      onSelect(address);
    }
  };

  const handleInputBlur = (): void => {
    // Wait a bit before closing dropdown so click event can be processed
    // Without this delay, dropdown would close before user can click an option
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <Box position="relative" width={width}>
      {/* INPUT FIELD */}
      <Input
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
        placeholder={placeholder}
        autoComplete="off"
        width={width}
      />

      {/* DROPDOWN WITH RESULTS */}
      {showDropdown && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          zIndex={1000}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="lg"
          maxH="200px"
          overflowY="auto"
          mt={1}
        >
          {isLoading ? (
            <Box px={4} py={2} color="gray.500">
              Searching...
            </Box>
          ) : results.length > 0 ? (
            results.map((address) => (
              <Box
                key={address.place_id}
                px={4}
                py={2}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleAddressSelect(address)}
                borderBottom="1px solid"
                borderBottomColor="gray.100"
                _last={{ borderBottom: "none" }}
              >
                {address.display_name}
              </Box>
            ))
          ) : (
            <Box px={4} py={2} color="gray.500">
              No results found
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
