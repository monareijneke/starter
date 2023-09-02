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

export const CardPage = ({ clickFn, item }) => {
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
          <Tag key={item.categories} variant="outline" color="#38B2AC">
            <TagLabel>{item.categories}</TagLabel>
          </Tag>
        </CardHeader>
        <CardBody pt={0}>
          <Text fontSize="1em">{item.description}</Text>
        </CardBody>
        <CardFooter fontSize="0.9em">
          from {item.startTime} till {item.endTime}
        </CardFooter>
      </Card>
    </Grid>
  );
};
