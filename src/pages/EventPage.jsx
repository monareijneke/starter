import { Text, Flex } from "@chakra-ui/react";

export const EventPage = () => {
  return (
    <Flex flexDirection={{ base: "column", sm: "row" }}>
      <Text fontSize={{ base: "24px", sm: "40px", md: "56px" }}>One Event</Text>
    </Flex>
  );
};
