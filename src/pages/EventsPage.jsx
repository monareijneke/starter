import { React, useState } from "react";
import { CardPage } from "./Card";
import { TextInput } from "./TextInput";
import { useLoaderData } from "react-router-dom";
import { Heading, Flex, Wrap, WrapItem, Center } from "@chakra-ui/react";

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

  const eventsWithCategory = events.map(event => {
    return {
      ...event,
      categories: event.categoryIds.map(
        id => categories.find(category => category.id == id).name
      ),
    };
  });

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
      <Wrap>
        <WrapItem>
          <Center gap={4}>
            {eventsWithCategory.map(event => (
              <CardPage clickFn={clickFn} item={event} key={event.id} />
            ))}
          </Center>
        </WrapItem>
      </Wrap>
    </Flex>
  );
};
