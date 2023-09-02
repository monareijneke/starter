import {
  Center,
  ListItem,
  Heading,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
  HStack,
  Tag,
  TagLabel,
  Image,
  Divider,
  Spacer,
} from "@chakra-ui/react";

// export const action = async ({ request }) => {
// const formData = Object.fromEntries(await request.formData());
// const deleteId = await fetch("http://localhost:3000/events", {
//   method: "DELETE",
//   body: JSON.stringify(formData),
//   headers: { "Content-Type": "application/json" },
// })
//   .then(res => res.json())
//   .then(json => json.id);
// return redirect(`/events/${deleteId}`);
// };

export const loader = async () => {
  return await fetch("http://localhost:3000/users");
};

export const EventPage = ({ item }) => {
  console.log(item);
  return (
    <Center flexDir="column" align="center">
      <Card w="65%" h="full">
        <CardHeader>
          <h1>{item.title}</h1>
          <CardHeader p={0}>
            <Flex flexDir="column">
              <Image src={item.image} w="100%" h="15em" />
              <Tag key={item.userName} variant="outline" color="#38B2AC">
                <TagLabel>{item.userName}</TagLabel>
              </Tag>
            </Flex>
          </CardHeader>
        </CardHeader>
        <CardBody>
          <Tag size="lg" borderRadius="full"></Tag>
        </CardBody>
        <CardFooter>
          <Button>edit</Button>
          <Button>delete</Button>
        </CardFooter>
      </Card>
    </Center>
  );
};
