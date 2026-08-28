# Counter-app
A simple counter application built with React. It lets users increase, decrease, and reset the count within defined limits (0-100), shows toast notifications for boundary actions, and displays a recent activity panel with the latest counter updates.

## Flex (Flex-grow) prevents children from overflowing, VERY USEFUL
Setting a component's display to flex allows it to stretch ("flex-grow") to contain its children, preventing them from ever overflowing.

## Generating randomUUID in the parent (Problem)
While working on this project, I ran into a problem because I was generating the IDs directly inside the .map() method by calling crypto.randomUUID(), which constantly changed the IDs of the active components.

I opted to generate them at the moment the element is added to the array, ensuring they do not change every time the application re-renders.

## Goey Toast
I used Goey Toast to generate toast cards that alert the user when they attempt to exceed the set limit. All of this was done to provide a better user experience.