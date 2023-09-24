import React from "react";
import { Text, Box } from "@chakra-ui/react";

//import { Link, Stack } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box bg="grey">
      <Text textAlign="center" color="white" fontWeight="bold">
        Global Event Society
        {/* <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
      </ul> */}
      </Text>
    </Box>
  );
};
