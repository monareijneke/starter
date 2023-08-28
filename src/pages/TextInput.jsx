import { Input } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => (
  <Input
    width="auto"
    borderColor="green"
    variant="filled"
    onChange={changeFn}
    {...props}
  ></Input>
);
