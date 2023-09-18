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
  useToast,
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

  // const eventsWithCategories = events => {
  //   events.forEach(event => {
  //     ({
  //       ...events,
  //       categories: event.categoryIds.map(
  //         id => categories.find(category => category.id == id).name
  //       ),
  //     });
  //   });
  //   eventsWithCategories();
  // };

  // console.log(events);

  const toast = useToast();
  const showToast = value => {
    toast({
      title: `you selected ${value}`,
      duration: 1500,
      status: "success",
      position: "top",
    });
  };
  const handleChange = event => {
    setSearchField(event.target.value);
  };

  const matchedEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleRadioButtonChange = value => {
    showToast(value);
    setRadioValue(value);
  };

  // const selectedCategory = eventsWithCategories.filter(event => {
  //   return event.categories.toLowerCase().includes(radioValue.toLowerCase());
  // });
  // console.log(selectedCategory);

  return (
    <Flex flexDirection={"column"} bg="lightsteelblue">
      <Flex flexDir="row">
        <Flex flexDir="column">
          <SearchInput
            item={searchField}
            changeFn={handleChange}
            width="15em"
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
          <Button color="white" bg="darkblue" m="25px">
            Add your own Event
          </Button>
        </Link>
      </Flex>

      {radioValue ? (
        <EventPage item={selectedCategory} key={selectedCategory.id} />
      ) : searchField ? (
        <EventPage item={matchedEvents} key={matchedEvents.id} />
      ) : (
        <>
          <Wrap>
            {events.map(event => (
              <>
                <WrapItem>
                  <Center gap={4}>
                    <Link to={`/events/${event.id}`}>
                      <CardPage item={event} key={event.id} />
                    </Link>
                  </Center>
                </WrapItem>
              </>
            ))}
          </Wrap>
        </>
      )}
    </Flex>
  );
};
