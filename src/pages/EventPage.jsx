import {
  Center,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Tag,
  TagLabel,
  Image,
} from "@chakra-ui/react";

export const loader = async () => {
  return await fetch("http://localhost:3000/users");
};

export const EventPage = ({ item }) => {
  console.log(item);
  return (
    <Center flexDir="column" align="center" w="100%">
      <Card w="65%" h="full">
        <CardHeader>
          <h1>{item.title}</h1>
          <CardHeader p={0}>
            <Flex flexDir="column">
              <Image src={item.image} w="100%" h="15em" />
              <Tag key={item.userName} variant="outline" color="#38B2AC">
                <TagLabel>{item.userName}</TagLabel>
              </Tag>
            </Flex>
          </CardHeader>
        </CardHeader>
        <CardBody>
          <Tag size="lg" borderRadius="full"></Tag>
        </CardBody>
        <CardFooter>
          <Button>edit</Button>
          <Button>delete</Button>
        </CardFooter>
      </Card>
    </Center>
  );
};
