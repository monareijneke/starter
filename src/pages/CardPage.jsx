import {
  Text,
  Tag,
  TagLabel,
  CardFooter,
  Heading,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const CardPage = event => {
  const { categories, users } = useLoaderData();

  const eventWithCategory = {
    ...event.item,
    categories: event.item.categoryIds.map(
      id => categories.find(category => category.id == id).name
    ),
    userName: users.find(user => user.id == event.item.createdBy).name,
    userImage: users.find(user => user.id == event.item.createdBy).image,
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
  return (
    <Grid>
      <Card
        backgroundColor="gray.100"
        variant="elevated"
        borderRadius={10}
        cursor="pointer"
        _hover={{ shadow: "dark-lg" }}
      >
        <CardHeader>
          <Heading color="#38B2AC" size="md" align="center">
            CardPage
            <Image src={finalEvent.image} borderRadius="5px" w="full" h="8em" />
            {finalEvent.title}
          </Heading>
          <Tag key={finalEvent.categories} variant="outline" color="#38B2AC">
            <TagLabel>
              {finalEvent.categories.map(category => {
                return category;
              })}
            </TagLabel>
          </Tag>
        </CardHeader>
        <CardBody pt={0}>
          <Text fontSize="1em">{finalEvent.description}</Text>
        </CardBody>
        <CardFooter fontSize="0.9em">
          On {finalEvent.date} from {finalEvent.startTime} till{" "}
          {finalEvent.endTime}
        </CardFooter>
      </Card>
    </Grid>
  );
};
