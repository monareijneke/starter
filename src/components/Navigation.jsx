import React from "react";
import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box bg="blue.600">
      <Text textAlign="center" color="white" fontWeight="bold">
        Global Event Society
        <ul>
          <li>
            <Link to="/">Show all Events</Link>
          </li>
        </ul>
      </Text>
    </Box>
  );
};
