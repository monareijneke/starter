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
  Box,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
  console.log(params);
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  console.log(event);
  const eventsWithCategory = event.map(event => {
    return {
      ...event,
      categories: event.categoryIds.map(
        id => categories.find(category => category.id == id).name
      ),
      userName: users.find(user => user.id == event.createdBy).name,
      userImage: users.find(user => user.id == event.createdBy).image,
    };
  });

  const clearTime = eventsWithCategory.map(event => {
    const start = event.startTime.split("T");
    const clearStartTime = start[1].slice(0, 5);
    const end = event.endTime.split("T");
    const clearEndTime = end[1].slice(0, 5);
    return {
      ...event,
      startTime: clearStartTime,
      endTime: clearEndTime,
    };
  });

  return (
    <Center flexDir="column" align="center" w="100%" bg="lightgrey">
      <Card w="100%" h="full">
        <CardHeader fontWeight="bold">
          <h1>{clearTime.title}</h1>
          <CardHeader m={0} p={0}>
            <Flex flexDir="column" color="white">
              <Image src={clearTime.image} w="100%" h="15em" />
            </Flex>
          </CardHeader>
        </CardHeader>
        <CardBody align="left">
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              What:{" "}
            </Text>
            <Text> {clearTime.description}</Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Time:{" "}
            </Text>
            <Text>
              {clearTime.startTime} - {clearTime.endTime} hrs
            </Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Where:{" "}
            </Text>
            <Text>{clearTime.location}</Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Categories:
            </Text>
            <Text>
              {clearTime.categories.map(category => {
                return category;
              })}
            </Text>
          </Flex>
        </CardBody>
        <hr />
        <CardFooter>
          <Flex w="100%">
            <Box w="50%">
              <Tag size="lg" borderRadius="full" bgColor="white">
                <Avatar
                  src={clearTime.userImage}
                  size="md"
                  name={clearTime.userName}
                  ml={-3}
                  mr={3}
                />

                <TagLabel> {clearTime.userName}</TagLabel>
              </Tag>
            </Box>
            <Spacer />
            <Box w="16.5%">
              <Link to={"/add"}>
                <Button mt={1}>edit</Button>
              </Link>
            </Box>
            <Spacer />
            <Box w="16.5%">
              <Link to={"/delete"}>
                <Button mt={1}>delete</Button>
              </Link>
            </Box>
            <Spacer />
            <Box w="16.5%">
              <Link to={"/"}>
                <Button mt={1}>back</Button>
              </Link>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
};
