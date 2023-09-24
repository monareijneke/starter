import { React, useState } from "react";

import { CardPage } from "./CardPage";
// import { EventPage } from "./EventPage";
// import { SearchInput } from "./SearchInput";
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
  // nieuw: ná eventsWithCategories, zodat je dit mee kan geven als state
  const [filteredEvents, setFilteredEvents] = useState(eventsWithCategories);

  const toast = useToast();
  const showToast = value => {
    toast({
      title: `you selected ${value}`,
      duration: 1500,
      status: "success",
      position: "top",
    });
  };

  // let matchedEvents = events.filter(event => {
  //   return event.title.toLowerCase().includes(searchField.toLowerCase());
  // });

  //nieuw

  const handleSearchInputChange = value => {
    setSearchField(value);
    setFilteredEvents(
      eventsWithCategories.filter(event => {
        return event.title.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const handleRadioButtonChange = value => {
    showToast(value);
    setRadioValue(value);
    //nieuw
    setFilteredEvents(
      eventsWithCategories.filter(event => {
        return event?.categories.includes(value.toLowerCase());
      })
    );
    // matchedEvents = eventsWithCategories.filter(event => {
    //   return event?.categories.includes();
    // });
  };

  // const selectedCategory = eventsWithCategories.filter(event => {
  //   return event.categories.toLowerCase().includes(radioValue.toLowerCase());
  // });
  // console.log(selectedCategory);

  return (
    <Flex flexDirection={"column"} bg="lightsteelblue">
      <Flex flexDir="row">
        <Flex flexDir="column">
          <Input
            m="25px"
            placeholder="search on eventname"
            width="auto"
            borderColor="green"
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
          <Button color="white" bg="darkblue" m="25px">
            Add your own Event
          </Button>
        </Link>
      </Flex>

      {/* {radioValue ? (
        <EventPage item={selectedCategory} key={selectedCategory.id} />
      ) :
      {searchField ? (
        <>
          {matchedEvents.map(event => (
            <EventPage item={event} key={event.id} />
          ))}
        </>
      ) : ( */}
      <>
        <Wrap>
          {filteredEvents.map(event => (
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
    </Flex>
  );
};
