import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsPageLoader } from "./pages/EventsPage";
import {
  createAction,
  AddEvent,
  loader as addEventLoader,
} from "./pages/AddEvent";
import {
  //editAction,
  EditEvent,
  loader as editEventLoader,
} from "./pages/EditEvent";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPageLoader,
      },

      {
        path: `/events/:eventId`,
        element: <EventPage />,
        loader: eventPageLoader,
      },

      {
        path: "/add",
        element: <AddEvent />,
        loader: addEventLoader,
        action: createAction,
      },
      {
        path: "/events/:eventId/edit",
        element: <EditEvent />,
        loader: editEventLoader,
        //action: editAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
