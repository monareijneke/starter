import { Input, Text, Box } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => (
  <Box align="center">
    <Text align="center">search on name:</Text>
    <Input
      width="auto"
      borderColor="green"
      variant="filled"
      onChange={changeFn}
      {...props}
    ></Input>
  </Box>
);
