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
import { ModalDelete } from "./ModalDelete";

export const loader = async () => {
  return await fetch("http://localhost:3000/events");
};

export const EventPage = ({ item, clickFn }) => {
  const events = useLoaderData();

  return (
    <Center flexDir="column" align="center" w="100%" bg="lightgrey">
      <Card w="100%" h="full">
        <CardHeader fontWeight="bold">
          <h1>{item.title}</h1>
          <CardHeader m={0} p={0}>
            <Flex flexDir="column" color="white">
              <Image src={item.image} w="100%" h="15em" />
            </Flex>
          </CardHeader>
        </CardHeader>
        <CardBody align="left">
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              What:{" "}
            </Text>
            <Text> {item.description}</Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Time:{" "}
            </Text>
            <Text>
              {item.startTime} - {item.endTime} hrs
            </Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Where:{" "}
            </Text>
            <Text>{item.location}</Text>
          </Flex>
          <Flex>
            <Text fontStyle="italic" fontWeight="bold">
              Categories:
            </Text>
            <Text>
              {item.categories.map(category => {
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
                  src={item.userImage}
                  size="md"
                  name={item.userName}
                  ml={-3}
                  mr={3}
                />

                <TagLabel> {item.userName}</TagLabel>
              </Tag>
            </Box>
            <Spacer />
            <Box w="16.5%">
              <Button mt={1} onClick={clickFn}>
                edit
              </Button>
            </Box>
            <Spacer />
            <Box w="16.5%">
              <Button
                mt={1}
                onClick={() => {
                  ModalDelete; //dit werkt niet
                }}
              >
                delete
              </Button>
            </Box>
            <Spacer />
            <Box w="16.5%">
              <Button onClick={() => <Link to="/" />} mt={1}>
                {/* dit werkt ook niet */}
                back
              </Button>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
};
