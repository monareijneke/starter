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

export const CardPage = ({ item }) => {
  console.log(item);
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
            <Image src={event.image} borderRadius="5px" w="full" h="8em" />
            {event.title}
          </Heading>
          <Tag key={event.categories} variant="outline" color="#38B2AC">
            <TagLabel>
              {event.categories.map(category => {
                return category;
              })}
            </TagLabel>
          </Tag>
        </CardHeader>
        <CardBody pt={0}>
          <Text fontSize="1em">{event.description}</Text>
        </CardBody>
        <CardFooter fontSize="0.9em">
          from {event.startTime} till {event.endTime}
        </CardFooter>
      </Card>
    </Grid>
  );
};
