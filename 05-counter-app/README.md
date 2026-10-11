# Counter-app
A simple counter application built with React. It lets users increase, decrease, and reset the count within defined limits (0-100), shows toast notifications for boundary actions, and displays a recent activity panel with the latest counter updates.

## Flex (Flex-grow) prevents children from overflowing, VERY USEFUL
Setting a component's display to flex allows it to stretch ("flex-grow") to contain its children, preventing them from ever overflowing.

## Generating randomUUID in the parent (Problem)
While working on this project, I ran into a problem because I was generating the IDs directly inside the .map() method by calling crypto.randomUUID(), which constantly changed the IDs of the active components.

I opted to generate them at the moment the element is added to the array, ensuring they do not change every time the application re-renders.

## Goey Toast
I used Goey Toast to generate toast cards that alert the user when they attempt to exceed the set limit. All of this was done to provide a better user experience.

## Avoiding Mutation
It is recommended to use immutability, like the second option I found to solve how new click records are added:

```jsx
const newActivities = [...activities]
if(newActivities.length === 3){
    newActivities.pop()
}
newActivities.unshift({
    text: text,
    id: crypto.randomUUID()
})
setActivity(newActivities)
```

As we can see, it achieves our goal, but we can point out **2 problems**:

1. React compares references. We absolutely must pass a "different" array (a new reference) for it to update the state; if we directly modify the original array, React will assume it hasn't changed.
2. We can end up working with old data due to the accumulation of clicks and the delay in state updates.

For this reason, we use this better solution, which is more compact and readable. We use a function inside `setActivity` to capture the immediately preceding data and work with it:

```jsx
const newActivity = {text: text, id: crypto.randomUUID()}
setActivity((prev) => [newActivity, ...prev].slice(0, 3))
```