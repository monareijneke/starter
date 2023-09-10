import { React, useState } from "react";

import { CardPage } from "./CardPage";
import { EventPage } from "./EventPage";
import { SearchInput } from "./SearchInput";
import { useLoaderData, Link } from "react-router-dom";
import {
  Spacer,
  Flex,
  Wrap,
  WrapItem,
  Center,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    events: await events.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  const [searchField, setSearchField] = useState("1");

  const [value, setValue] = useState("");
  console.log(events);

  const handleChange = event => {
    setSearchField(event.target.value);
  };

  const matchedEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <Flex flexDirection={"column"} bg="lightsteelblue" w="100%">
      <Flex flexDir="row">
        <Flex flexDir="column">
          <SearchInput
            item={searchField}
            changeFn={handleChange}
            width="15em"
          />
          <RadioGroup m="0 0 15px 20px" onChange={setValue} value={value}>
            <Stack align="center" direction="row">
              <Radio value={1}>Sports</Radio>
              <Radio value={2}>Games</Radio>
              <Radio value={3}>Relaxation</Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        <Spacer />
        <Link to={"/add"}>
          <Button color="white" bg="darkblue" m="25px">
            Add your own Event
          </Button>
        </Link>
      </Flex>

      {searchField ? (
        <EventPage item={matchedEvents} key={matchedEvents.id} />
      ) : (
        <>
          <Wrap>
            <WrapItem>
              <Center gap={4}>
                <Link to={`/events/:eventId`}>
                  {events.map(event => (
                    <CardPage item={event} key={event.id} />
                  ))}
                </Link>
              </Center>
            </WrapItem>
          </Wrap>
        </>
      )}
    </Flex>
  );
};
