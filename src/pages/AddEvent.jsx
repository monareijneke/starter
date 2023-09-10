import { useLoaderData, redirect, Form } from "react-router-dom";
import {
  Card,
  FormControl,
  Input,
  Textarea,
  Heading,
  FormLabel,
  Button,
  Link,
  Stack,
  HStack,
  Select,
} from "@chakra-ui/react";

export const createAction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(json => json.id);
  return redirect(`/events/${newId}`);
};

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const AddEvent = () => {
  const { users, categories } = useLoaderData();

  return (
    <>
      <Card variant="elevated" borderRadius={10} align="center" ml="10">
        <Heading padding="5px" fontSize="md">
          Input new Event
        </Heading>
        <Link to={"/"}>
          <Button colorScheme="gray" size="sm" type="back">
            back
          </Button>
        </Link>
        <Form method="POST" action="/add">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" width="sm" />
          </FormControl>
          <FormControl>
            <FormLabel>Decription</FormLabel>
            <Textarea
              name="description"
              placeholder="Enter a description of the event"
              rows="8"
            />
          </FormControl>
          <FormControl display="flex" ml="2" mt="4">
            <HStack spacing="4">
              <FormLabel mb="0">Category</FormLabel>
              <Select variant="outline" name="categoryIds">
                {categories.map(category => (
                  <option key="" value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>

              <FormLabel mb="0">Creator</FormLabel>

              <Select name="userId">
                {users.map(user => (
                  <option key="" value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </HStack>
          </FormControl>
          <FormControl display="flex" m="2">
            <FormLabel width="20">Where</FormLabel>
            <Input type="text" name="location" width="75" />
          </FormControl>
          <FormControl display="flex" m="2">
            <FormLabel width="20">Date</FormLabel>
            <Input type="date" name="date" w="75" />
          </FormControl>
          <FormControl display="flex" m="2">
            <FormLabel width="20">From</FormLabel>
            <Input type="time" name="startTime" w="75" />
          </FormControl>
          <FormControl display="flex" m="2">
            <FormLabel width="20">Till</FormLabel>
            <Input type="time" name="endTime" width="75" />
          </FormControl>

          <Stack>
            <Button colorScheme="teal" size="sm" type="submit">
              sumbit
            </Button>
          </Stack>
        </Form>
      </Card>
    </>
  );
};
