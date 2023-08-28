import {
  SimpleGrid,
  CardFooter,
  ListItem,
  Heading,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
  HStack,
  Tag,
  TagLabel,
  Image,
  Divider,
  Spacer,
} from "@chakra-ui/react";

export const EventPage = ({ item, clickFn }) => {
  console.log(item);
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Card variant="elevated">
        <CardHeader>
          <Heading color="#38B2AC" size="md" align="center">
            <Image src={item.image} borderRadius="5px" w="full" h="8em" />
            {item.title}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm">{item.description}</Text>
        </CardBody>
        <CardFooter>
          <Flex spacing="5px" flexDir="row">
            <Button
              color="#38B2Ay"
              borderRadius={50}
              align="bottom"
              onClick={() => clickFn()}
            >
              back
            </Button>
            <Button
              color="#38B2A"
              borderRadius={50}
              align="bottom"
              onClick={() => clickFn()}
            >
              delete
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
};
