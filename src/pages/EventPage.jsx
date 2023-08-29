import {
  Text,
  CardFooter,
  Heading,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Button,
  Image,
  HStack,
} from "@chakra-ui/react";

export const EventPage = () => {
  return (
    <Flex flexDirection={{ base: "column", sm: "row" }}>
      <Text fontSize={{ base: "24px", sm: "40px", md: "56px" }}>One Event</Text>
    </Flex>
  );
};
