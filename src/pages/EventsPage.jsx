import { React, useState } from "react";
import { CardPage } from "./Card";
import { TextInput } from "./TextInput";
import { useLoaderData } from "react-router-dom";
import { Heading, Flex, Wrap, Center } from "@chakra-ui/react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  //const users = await fetch("http://localhost:3000/users");

  return {
    events: await events.json(),
    categories: await categories.json(),
    //users: await users.json(),
  };
};

export const EventsPage = ({ clickFn }) => {
  const { events, categories } = useLoaderData();
  const [searchField, setSearchField] = useState("");

  const handleChange = event => {
    setSearchField(event.target.value);
  };
  return (
    <Flex flexDirection={"column"}>
      <TextInput
        item={searchField}
        changeFn={handleChange}
        width="15em"
        mb={10}
      />

      <Heading align="center" size="lg">
        List of events
      </Heading>
      <Wrap spacing="10px">
        <Center>
          {events.map(event => (
            <CardPage
              clickFn={clickFn}
              item={event}
              cat={categories}
              key={event.id}
            />
          ))}
        </Center>
      </Wrap>
    </Flex>
  );
};

// <ListItem key={event.id}>
//   <Link to={`event/${event.id}`}>
//     <Text textDecoration="underline">{event.title}:</Text>
//   </Link>
//   <Text fontSize="10px">Category:</Text>
//   <Text fontSize="12px">
//     What:
//     {event.description} from {event.startTime} till {event.endTime}
//   </Text>
//   <Text fontSize="12px">
//     When: from {event.startTime} till {event.endTime}
//   </Text>
//   <Image w="200px" h="10vw" src={event.image}></Image>
// </ListItem>;
