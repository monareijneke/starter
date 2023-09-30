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
  useToast,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
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

  const eventWithCategory = {
    ...event,
    categories: event.categoryIds.map(
      id => categories.find(category => category.id == id).name
    ),
    userName: users.find(user => user.id == event.createdBy).name,
    userImage: users.find(user => user.id == event.createdBy).image,
  };

  const reverseString = date => {
    const splitDate = date.split("-");
    const reverseArray = splitDate.reverse();
    const joinArray = reverseArray.join("-");
    return joinArray;
  };

  const finalEvent = {
    ...eventWithCategory,
    date: reverseString(eventWithCategory.startTime.slice(0, 10).toString()),
    startTime: eventWithCategory.startTime.split("T")[1].slice(0, 5).toString(),
    endTime: eventWithCategory.endTime.split("T")[1].slice(0, 5).toString(),
  };

  const toast = useToast();
  const showToast = id => {
    toast({
      title: "Warning",
      description: `you deleted ${id.title}`,
      duration: 3000,
      isClosable: true,
      status: "warning",
      position: "top",
    });
  };
  const handleDelete = id => {
    showToast(id);
    fetch(`http://localhost:3000/events/${id.id}`, {
      method: "DELETE",
    });
  };
  return (
    <Center
      display="flex"
      flexDir="column"
      align="center"
      w="100%"
      bg="lightgrey"
    >
      <Card minWidth={450} h="full">
        <CardHeader fontWeight="bold">
          <h1>{finalEvent.title}</h1>
          <CardHeader m={0} p={0}>
            <Flex flexDir="column" color="white">
              <Image src={finalEvent.image} w="100%" h="15em" />
            </Flex>
          </CardHeader>
        </CardHeader>
        <CardBody align="left">
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              What{" =>"}
            </Text>
            <Text> {finalEvent.description}</Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              When{" =>"}
            </Text>
            <Text> {finalEvent.date}</Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Time{" =>"}
            </Text>
            <Text>
              {finalEvent.startTime} - {finalEvent.endTime} hrs
            </Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Where{" =>"}
            </Text>
            <Text>{finalEvent.location}</Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Categories{" =>"}
            </Text>
            <Text>
              <List>
                {finalEvent.categories.map(category => {
                  return <ListItem key={category}>{category}</ListItem>;
                })}
              </List>
            </Text>
          </Flex>
        </CardBody>
        <hr />
        <CardFooter pl={-5} pr={0}>
          <Flex w="100%">
            <Box w="50%">
              <Tag size="lg" borderRadius="full" bgColor="white">
                <Avatar
                  src={finalEvent.userImage}
                  size="md"
                  name={finalEvent.userName}
                  ml={-3}
                  mr={3}
                />

                <TagLabel font={9}> {finalEvent.userName}</TagLabel>
              </Tag>
            </Box>
            <Spacer />

            <Box w="16.5%">
              <Link to={`/events/${event.id}/edit`}>
                <Button
                  colorScheme="blue"
                  size="sm"
                  padding={4}
                  onClick={event => {
                    event.target.value;
                  }}
                >
                  edit
                </Button>
              </Link>
            </Box>
            <Spacer />

            <Box w="16.5%">
              <Link to={"/"}>
                <Button
                  colorScheme="blue"
                  size="sm"
                  padding={4}
                  onClick={() => handleDelete(event)}
                >
                  delete
                </Button>
              </Link>
            </Box>
            <Spacer />

            <Box w="16.5%">
              <Link to={"/"}>
                <Button colorScheme="blue" size="sm" padding={4}>
                  back
                </Button>
              </Link>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
};
