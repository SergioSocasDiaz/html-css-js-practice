# Todo List (React)

## What this app does
- Simple todo app built with React components: `App`, `TaskInput`, `TaskList`, `TaskItem`, `TaskCounter`, and `Header` with task persistance in `LocalStorage`

# Use of `minmax()` to not push content below

- CSS Grid `minmax(0, 1fr)` lets a middle row take remaining space without forcing children to overflow the whole layout.
  
- The use `minmax(0, 1fr)` plus scrollable content to avoid layout shifts when lists grow.

# Arrays in states

- Component state stored as an array of task objects (id, text, completed) represents the app's list model.
  
- Arrays let you map, filter, and sort tasks while keeping UI and logic predictable.

# Submit Forms

- Form submission captures user input and creates a new task entry on submit events.
  
- Use form `onSubmit` to centralize creation logic and prevent default navigation.

# Form clrearing

- Clearing form fields after submit improves UX and shows success to the user.
  
- Controlled inputs + parent callbacks make it simple to reset fields reliably.

# Controlled inputs **Important**

- Controlled inputs have their value driven by React state; uncontrolled inputs read value from DOM refs or `FormData`.
  
- In this project the text input in `TaskInput` is controlled (`value` + `onChange`), while the app uses `FormData` to collect the value in the submit handler 
  
- Controlled inputs are predictable; combining them with `form` submission is practical for small forms.

# What is an UUID

- A UUID is a unique identifier for items so you can track, update, or delete them without collisions.
  
- `crypto.randomUUID()` is used in `App.jsx` to generate `id` for each task when creating new items.
  
- Use UUIDs for stable keys in lists and to avoid relying on array indices.
  
# Sort Method

- `Array.prototype.sort` orders items based on a comparator function; useful for grouping or priorities.
  
- Important: clone arrays before sorting (`[...]`) to avoid mutating React state directly and later use the `setStateFunction`.

# UseEffect

- `useEffect` runs side effects after render.

- Behavior:
	- No dependency array: effect runs after every render.
  
	- Empty array `[]`: effect runs once after the component mounts (The first render).
  
	- With dependencies `[a, b]`: effect runs after the first render and whenever any dependency changes.
  
	- **Important** Cleanup: We can return a function to clean (clear timeouts etc), React runs that cleanup before the next effect and when the component unmounts (we navigate to another page).

- Common uses:
	- Persisting state (e.g., `localStorage`), fetching data on mount, subscribing to events, timers, and interacting with the DOM imperatively.

- Pitfalls and tips:
  
  1. Stale closures: Use the dependency array to avoid stay with the old and initial data.

  2. Avoid heavy synchronous work inside effects, use debounce to prevent junk work
   
  3. When updating state inside an effect, be careful with dependencies to avoid infinite loops
   
  4. Use a cleanup function to remove subscriptions or timers to avoid memory leaks.

- In this project it is used to persist de tasks of the user

# Improvements

- LocalStorage validation:
	- Use `try/catch` when parsing `localStorage` to prevent runtime errors from malformed data.
	- Validate the parsed value (e.g., ensure it's an array and items have `id`, `text`, and `completed` keys) before using it.

- Avoid sorting on every render:
  - The sorted list with `useMemo(() => [...tareas].sort(...), [tareas])` to avoid unnecessary computation when the component re-renders frequently.

- Use a consistent language:
	- Keep code comments, variable names, and UI strings in one language for maintainability and collaboration.

- Input validation:
	- Trim input and reject empty or whitespace-only strings before creating a task.

- Accessibility:
	- Add `aria-label` to icon-only buttons
  
	- Ensure checkboxes are keyboard-accessible, maintain focus, and expose state via ARIA when needed.