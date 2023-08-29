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

export const CardPage = ({ item, cat, clickFn }) => {
  return (
    <Flex flexDirection={{ base: "column", sm: "row" }}>
      <Text fontSize={{ base: "24px", sm: "40px", md: "56px" }}>
        <Card backgroundColor="gray.100" variant="elevated">
          <CardHeader>
            <Heading color="#38B2AC" size="md" align="center">
              <Image src={item.image} borderRadius="5px" w="full" h="8em" />
              {item.title}
              {/* <span>
                {cat.map(
                  category => category.id === item.find(id => id.categoryIds)
                )}
                return category.name
              </span> */}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="sm">{item.description}</Text>
          </CardBody>
          <CardFooter>
            <HStack spacing="auto">
              <Button
                color="#38B2Ay"
                borderRadius={5}
                align="bottom"
                onClick={() => clickFn()}
              >
                back
              </Button>
              <Button
                color="#38B2A"
                borderRadius={5}
                align="bottom"
                onClick={() => clickFn()}
              >
                delete
              </Button>
            </HStack>
          </CardFooter>
        </Card>
      </Text>
    </Flex>
  );
};
