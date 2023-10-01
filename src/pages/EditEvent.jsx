import { useLoaderData, useNavigate, Form, Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  FormControl,
  Input,
  Textarea,
  Heading,
  FormLabel,
  Button,
  Stack,
  HStack,
  Select,
  useToast,
} from "@chakra-ui/react";

export const loader = async ({ params }) => {
  const eventId = params.eventId;
  const event = await fetch(`http://localhost:3000/events/${eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EditEvent = () => {
  const { event, users, categories } = useLoaderData();
  const [eventObject, setEventObject] = useState(event);
  const navigate = useNavigate();

  const onSubmit = async () => {
    showToast();
    console.log(event);
    console.log(eventObject);

    if (eventObject.startTime.length === 5) {
      eventObject.startTime = eventObject.date.concat(
        `T${eventObject.startTime}`
      );
    } else
      eventObject.startTime = eventObject.date.concat(
        eventObject.startTime.slice(10)
      );

    if (eventObject.endTime.length === 5) {
      eventObject.endTime = eventObject.date.concat(`T${eventObject.endTime}`);
    } else
      eventObject.endTime = eventObject.date.concat(
        eventObject.endTime.slice(10)
      );

    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      body: JSON.stringify(eventObject),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(json => json.id);
    navigate("/");
  };

  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Submit",
      description: "you succesfully changed the event",
      duration: 4000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  };

  return (
    <>
      <Card variant="elevated" borderRadius={10} align="center" m="10">
        <Heading padding="5px" fontSize="md">
          Make your changes
        </Heading>

        <Form method="PUT">
          <FormControl>
            <Input
              type="text"
              name="title"
              width="sm"
              placeholder="title"
              mt="4"
              defaultValue={eventObject.title}
              onChange={e =>
                setEventObject({ ...eventObject, title: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <Input
              type="url"
              name="image"
              pattern="https://.*"
              width="sm"
              placeholder="http://image-url"
              mt="4"
              defaultValue={eventObject.image}
              onChange={e =>
                setEventObject({ ...eventObject, image: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <Textarea
              name="description"
              placeholder="Enter a description of the event"
              rows="8"
              mt="4"
              w="sm"
              defaultValue={eventObject.description}
              onChange={e =>
                setEventObject({
                  ...eventObject,
                  description: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl display="flex" ml="2" mt="4">
            <HStack spacing="4">
              <FormLabel mb="0">Category</FormLabel>
              <Select variant="outline" name="categoryIds">
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>

              <FormLabel mb="0">Creator</FormLabel>

              <Select name="createdBy">
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </HStack>
          </FormControl>
          <FormControl display="flex" m="2">
            <FormLabel width="20">Where</FormLabel>
            <Input
              type="text"
              name="location"
              width="75"
              defaultValue={eventObject.location}
              onChange={e =>
                setEventObject({ ...eventObject, location: e.target.value })
              }
            />
          </FormControl>
          <FormControl display="flex" m="2">
            <FormLabel width="20">Date</FormLabel>
            <Input
              type="date"
              name="date"
              w="75"
              defaultValue={eventObject.date}
              onChange={e =>
                setEventObject({ ...eventObject, date: e.target.value })
              }
            />
          </FormControl>
          <FormControl display="flex" m="2">
            <FormLabel width="20">From</FormLabel>
            <Input
              type="time"
              name="startTime"
              w="75"
              defaultValue={eventObject.startTime}
              onChange={e =>
                setEventObject({ ...eventObject, startTime: e.target.value })
              }
            />
          </FormControl>
          <FormControl display="flex" m="2">
            <FormLabel width="20">Till</FormLabel>
            <Input
              type="time"
              name="endTime"
              width="75"
              defaultValue={eventObject.endTime}
              onChange={e =>
                setEventObject({ ...eventObject, endTime: e.target.value })
              }
            />
          </FormControl>

          <Stack>
            <Button
              colorScheme="blue"
              size="sm"
              type="submit"
              onClick={onSubmit}
            >
              sumbit the change
            </Button>
            <Link to={"/"}>
              <Button colorScheme="gray" size="sm" width="100%">
                back without making a change
              </Button>
            </Link>
          </Stack>
        </Form>
      </Card>
    </>
  );
};
