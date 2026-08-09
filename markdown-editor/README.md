# Markdown Editor

A small markdown editor built with HTML, CSS, and vanilla JavaScript. It lets you write markdown on the left side and see the rendered result on the right side in real time.

This project also uses a few small libraries to improve the experience:

- [marked](https://marked.js.org/) to parse markdown
- [DOMPurify](https://github.com/cure53/DOMPurify) to clean the rendered HTML
- [SweetAlert2](https://sweetalert2.github.io/) for confirmation and success dialogs

## What it does

- Live markdown preview while you type
- Bold and italic formatting buttons
- Keyboard shortcuts for formatting with `Ctrl + B` and `Ctrl + I`
- Theme switcher
- Save the current text in `localStorage`
- Download the markdown content as a file
- Delete the saved content with confirmation

## How to use it

1. Open the project in a browser.
2. Write your markdown in the editor area.
3. Watch the preview update automatically.
4. Use the toolbar buttons or shortcuts to format text.
5. Enter a file name if you want a custom name for the downloaded file.
6. Click Save to keep your text in the browser.
7. Click Download to export the content as a markdown file.

## Notes

- The layout is responsive
- The editor keeps the cursor position when adding bold or italic markers.
- The preview is sanitized before being shown, so unsafe HTML is removed.

## Run

This project is allocated in: [markdown-editor-socas.netlify.app](markdown-editor-socas.netlify.app)