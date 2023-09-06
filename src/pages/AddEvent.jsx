import { useLoaderData, redirect } from "react-router-dom";
import {
  Container,
  FormControl,
  Input,
  Textarea,
  Heading,
  FormLabel,
  Button,
  Link,
} from "@chakra-ui/react";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(json => json.id);
  return redirect(`/events/${newId}`);
};

export const loader = async () => {
  return await fetch("http://localhost:3000/users");
};

export const AddEvent = () => {
  const users = useLoaderData();
  console.log(users);

  return (
    <>
      <Container align="center">
        <Heading padding="5px" fontSize="md">
          Input for new Event
        </Heading>
        <FormControl method="post">
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" width="md" />
          <FormLabel>Decription</FormLabel>
          <Textarea
            name="description"
            placeholder="short description"
            rows="8"
          />
          <FormLabel>Category</FormLabel>
          <Input type="text" name="categories" width="md" />
          <FormLabel>Where</FormLabel>
          <Input type="text" name="location" width="md" />
          <FormLabel>When</FormLabel>
          <Input type="text" name="title" width="md" />
          <Button colorScheme="gray" size="sm" type="back">
            <Link to="/EventsPage">back</Link>
          </Button>
          <stack>
            <select placeholder="select user" name="userId">
              {users.map(user => (
                <option key="" value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </stack>
          <Button colorScheme="teal" size="sm" type="submit">
            sumbit
          </Button>
        </FormControl>
      </Container>
    </>
  );
};
