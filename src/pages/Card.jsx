import {
  Text,
  CardFooter,
  Heading,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@chakra-ui/react";

export const CardPage = ({ item, clickFn }) => {
  const start = item.startTime.split("T");
  const startTime = start[1].slice(0, 5);
  const end = item.endTime.split("T");
  const endTime = end[1].slice(0, 5);

  return (
    <Grid>
      <Card
        backgroundColor="gray.100"
        variant="elevated"
        borderRadius={10}
        cursor="pointer"
        _hover={{ shadow: "dark-lg" }}
        onClick={() => clickFn(item)}
      >
        <CardHeader>
          <Heading color="#38B2AC" size="md" align="center">
            <Image src={item.image} borderRadius="5px" w="full" h="8em" />
            {item.title}
          </Heading>
          <Text fontStyle="italic" align="center">
            {item.categories}
          </Text>
        </CardHeader>
        <CardBody pt={0}>
          <Text fontSize="1em">{item.description}</Text>
        </CardBody>
        <CardFooter fontSize="0.9em">
          from {startTime} till {endTime}
        </CardFooter>
      </Card>
    </Grid>
  );
};

// const eventsWithCategory = events.map(event => {
//   return {
//     ...event,
//     categories: event.categoryIds.map(
//       id => categories.find(category => category.id == id).name
//     ),
//   };
// });
// console.log(eventsWithCategory);
