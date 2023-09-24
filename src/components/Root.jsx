import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box bgcolor="black" maxW="max" maxH="full">
      <Navigation />

      <Outlet />
    </Box>
  );
};
