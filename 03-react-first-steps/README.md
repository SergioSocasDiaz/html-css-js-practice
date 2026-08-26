
# Calculator (React)

## What this app does
- Simple calculator built with React components: `Calculator`, `Display`, and `ButtonPad`. Buttons are driven by a JSON data file and actions are handled with component callbacks.


## State management patterns
- The app uses multiple `useState` hooks (`display`, `prevValue`, `operator`, `waitingForOperand`). Each piece of state has a clear responsibility (current value, stored previous value, selected operator, and whether the next digit should replace the display).

## Action handlers & flow
- Numeric, operator, equals and clear actions are separated into small functions (`handleClickNumber`, `handleClickOperand`, `handleClickEquals`, `handleClickClear`). This keeps logic readable and testable.

## Operation dictionary
- Arithmetic operators are implemented as a plain object (`operaciones`) mapping operator symbols to functions.

## Data-driven UI
- The buttons are generated from `src/components/data.json` and rendered by `ButtonPad`. Each button object contains `id`, `label`, `type`, `value` and optional layout flags (`span`), allowing layout and behavior to be configured from data.

## String vs number handling
- The display is stored as a string for easy concatenation of digits; numeric conversion (`Number(display)`) is used only when performing calculations.

## UX flags
- `waitingForOperand` is used as a flag to decide whether digit presses should replace or append to the display.


# Improvements

## Implement missing actions or guard them
- `data.json` includes `±` and `%` buttons but their behavior is not implemented.


## Division by zero & precision
- Add guards for division by zero and normalize floating-point results to avoid long repeating decimals.

## Use functional state updates where needed
- When computing `result` based on previous state, consider `setPrevValue(prev => operaciones[operator](prev, currentValue))` to be robust against concurrency.

## Keyboard and accessibility
- Add keyboard handlers (arrow/enter) and `aria-label` attributes to buttons for screen readers

## Responsive
- Improve responsive sizing for devices (use rem/em and container queries) and add clear focus/active states for better mobile/keyboard UX.


# Study note

- React state setters (like `setPrevValue`) are asynchronous: calling `setPrevValue(result)` schedules a state update, but the `prevValue` variable inside the current function still holds the old value until React processes the update and re-renders.

- In `Calculator.jsx` the commented logs after `setPrevValue(result)` read `prevValue` from the current render, so they print the previous value, not the newly scheduled one.

- How to observe the updated value correctly:
	- Use a local variable for the computed value and log that: `const newPrev = result; setPrevValue(newPrev); console.log(newPrev)`.
  
	- Or use `useEffect(() => { console.log(prevValue); }, [prevValue])` to run code after React applies the update and the value changes.
  
	- **Important** When new state depends on previous state, we can use callbacks to delegate the calculus of the result preventing to use a old value: `setPrevValue(prev => operaciones[operator](prev, currentValue))`.

- Don't rely on reading updated state immediately after calling its setter, either log the computed value directly or observe the change in an effect.


