import { React, useState } from "react";
import { AddEvent } from "./AddEvent";
import { CardPage } from "./CardPage";
import { EventPage } from "./EventPage";
import { TextInput } from "./TextInput";
import { useLoaderData } from "react-router-dom";
import {
  Spacer,
  Flex,
  Wrap,
  WrapItem,
  Center,
  Button,
  Link,
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
  const { events, categories, users } = useLoaderData();
  const [searchField, setSearchField] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  const eventsWithCategory = events.map(event => {
    return {
      ...event,
      categories: event.categoryIds.map(
        id => categories.find(category => category.id == id).name
      ),
      userName: users.find(user => user.id == event.createdBy).name,
    };
  });
  const matchedEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
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

  const handleChange = event => {
    setSearchField(event.target.value);
  };
  return (
    <Flex flexDirection={"column"} bg="lightsteelblue" w="100%">
      <Flex flexDir="row">
        <TextInput
          item={searchField}
          changeFn={handleChange}
          width="15em"
          mb={10}
        />
        <Spacer />
        <Button color="white" bg="darkblue" m="25px">
          <Link to="/AddEvent">Add your own Event</Link>
        </Button>
      </Flex>
      {searchField ? (
        <EventPage item={matchedEvents} />
      ) : (
        <>
          {selectedEvent ? (
            <>
              <EventPage item={selectedEvent} clickFn={setSelectedEvent} />
            </>
          ) : (
            <Wrap>
              <WrapItem>
                <Center gap={4}>
                  {clearTime.map(event => (
                    <CardPage
                      clickFn={setSelectedEvent}
                      item={event}
                      key={event.id}
                    />
                  ))}
                </Center>
              </WrapItem>
            </Wrap>
          )}
        </>
      )}
    </Flex>
  );
};
