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
  Avatar,
  Text,
  Image,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  return await fetch("http://localhost:3000/events");
};

export const EventPage = ({ item, clickFn }) => {
  console.log(item);
  const events = useLoaderData();
  console.log(events);
  return (
    <Center flexDir="column" align="center" w="100%" bg="lightgrey">
      <Card w="100%" h="full">
        <CardHeader>
          <h1>{item.title}</h1>
          <CardHeader m={0} p={0}>
            <Flex flexDir="column" color="white">
              <Image src={item.image} w="100%" h="15em" />
            </Flex>
          </CardHeader>
        </CardHeader>
        <CardBody>
          <Text>What: {item.description}</Text>
          <Text>
            When: {item.startTime} - {item.endTime}
          </Text>
          <Text>Where: {item.location}</Text>
          <Text>
            Categories:
            {item.categories.map(category => {
              return category;
            })}
          </Text>
        </CardBody>
        <CardFooter>
          <Tag size="lg" w="50%" borderRadius="full">
            <Avatar
              src={item.userImage}
              size="md"
              name={item.userName}
              ml={-3}
            />

            <TagLabel> {item.userName}</TagLabel>
          </Tag>
          <Button>edit</Button>
          <Button>delete</Button>
        </CardFooter>
      </Card>
    </Center>
  );
};
