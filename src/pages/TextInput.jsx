import { Input, Box } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => (
  <Box align="center">
    <Input
      m="25px"
      placeholder="search on eventname"
      width="auto"
      borderColor="green"
      variant="filled"
      onChange={changeFn}
      {...props}
    ></Input>
  </Box>
);
