# What I Learned Building This Project

## Layout and structure

One important thing I learned was how to make the height of the page fit well between the header, main area, and footer using CSS Grid with fractional units. This made the editor feel more stable and easier to control, especially when the screen size changes.

## Markdown rendering

I learned how to use the `marked` library to convert markdown text into HTML in real time. This made the editor much more useful, because the user can write markdown and immediately see the formatted result.

## Safe HTML output

Another important lesson was using `DOMPurify` before showing the rendered content. This helped me understand that when user input becomes HTML, it should be cleaned first to avoid unsafe code being inserted into the page resultin in XSS attacks.

## User feedback

I used `SweetAlert2` to show confirmation and success messages. This taught me that small feedback dialogs can improve the UI experience and make actions like saving or deleting feel clearer.

## Textarea behavior

I learned about textarea cursor properties such as `selectionStart`, `selectionEnd`, and `setSelectionRange`. These were necessary to insert bold and italic markers without losing the cursor position.

## Keyboard shortcuts

I also practiced handling keyboard events. Adding shortcuts like `Ctrl + B` and `Ctrl + I` made the editor faster.

## Saving data

I used the `localStorage` to keep the written text inside the browser. That way, the user can close the page and open it later without losing the saved content.

## Responsiveness and theme switching

I learned how to adapt the layout for smaller screens so the editor remains usable on mobile devices. 

I also built a simple theme switcher, which helped me practice working with CSS variables and class toggling in JavaScript.
