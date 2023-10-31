import { React, useState } from "react";
import { CardPage } from "./CardPage";
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
  Input,
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
  const { events, categories } = useLoaderData();
  const [searchField, setSearchField] = useState("");
  const [radioValue, setRadioValue] = useState("");

  const eventsWithCategories = events.map(event => ({
    ...event,

    categories: event.categoryIds.map(
      id => categories.find(category => category.id == id).name
    ),
  }));

  const [filteredEvents, setFilteredEvents] = useState(eventsWithCategories);

  const handleSearchInputChange = value => {
    setSearchField(value);
    setFilteredEvents(
      eventsWithCategories.filter(event => {
        return event.title.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const handleRadioButtonChange = value => {
    setRadioValue(value);

    setFilteredEvents(
      eventsWithCategories.filter(event => {
        return event?.categories.includes(value.toLowerCase());
      })
    );
  };

  return (
    <Flex flexDirection={"column"} bg="lightsteelblue">
      <Flex flexDir="row">
        <Flex flexDir="column">
          <Input
            m="25px"
            placeholder="search on eventname"
            width="auto"
            borderColor="blue.500"
            variant="filled"
            type="text"
            id="searchField"
            name="searchField"
            value={searchField}
            onChange={event => handleSearchInputChange(event.target.value)}
          />

          <RadioGroup
            m="0 0 15px 20px"
            onChange={handleRadioButtonChange}
            value={radioValue}
          >
            <Stack align="center" direction="row">
              <Radio value={"Sports"}>Sports</Radio>
              <Radio value={"Games"}>Games</Radio>
              <Radio value={"Relaxation"}>Relaxation</Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        <Spacer />
        <Link to={"/add"}>
          <Button color="white" bg="blue.600" m="25px">
            Add a new Event
          </Button>
        </Link>
      </Flex>

      <Wrap>
        {filteredEvents.map(event => (
          <WrapItem key={event.id}>
            <Center gap={4}>
              <Link to={`/events/${event.id}`}>
                <CardPage item={event} />
              </Link>
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};
