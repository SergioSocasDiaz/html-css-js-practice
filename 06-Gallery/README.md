# Gallery Project
This project is a small product gallery built to practice React concepts such as components, props, state, hooks, routing, data fetching, and conditional rendering. Its purpose is solely to consolidate React knowledge through practice, rather than to serve as a production-ready application.

# Learning
## useRouter
This custom hook keeps the rendered route synchronized with the browser history. It stores the current pathname, listens for `popstate` events, and exposes a `navigateTo` function that updates the URL without performing a full page reload.
## Route Component
The `Route` component provides a small route-matching layer for this project. It compares the current pathname with the route it receives and renders the associated component only when both paths match.
# URL Info
The browser URL contains several useful pieces of navigation state. `pathname` identifies the current page, `search` contains the raw query string, and `searchParams` provides a structured API for reading individual values such as the search term or page number.
# URL Making
URLs can be inspected through `window.location` or by creating a `URL` object. The `URL` object is usually easier to work with because it exposes named properties and safely handles query parameters.
# URL Purpose
Putting meaningful state in the URL makes the application more reliable. Refreshing the page, sharing a link, or using the browser back and forward buttons can then reproduce the same view instead of depending on temporary component state.
# Data through pages
Moving data between pages involves a trade-off between performance and persistence. Passing an object through navigation state can avoid another request, but an identifier in the URL is more durable because another browser can use it to retrieve the same resource.
# Never fixed dimensions
Fixed dimensions can force images, cards, or containers to overflow on small screens. Prefer fluid widths, responsive constraints, and CSS functions such as `minmax()` so the layout can adapt to the available viewport.
# Pagination + URL
Pagination belongs in the URL for the same reason as the search term: it is part of the current view. Updating the page parameter gives navigation a stable, shareable state and lets React fetch and render the correct slice of results.

# Href
We are using custom hooks, however is a good practice to include the href atributte to the "a" tags. Then we prevent the default navigation with `event.preventDefault()`

# Index on Keys
An array index is only a safe key when list items have no stable identity and the order never changes. Product cards should use their product ID; the pagination ellipsis is a special case where a generated index currently prevents duplicate keys for repeated `...` values.
# Framer motion: useScroll, useTransform, motion
Framer Motion adds declarative animation primitives to React. `motion` turns an element into an animated component, while `useScroll` exposes scroll progress and `useTransform` maps that progress to another visual value such as opacity, position, or scale.

# On animationEnd
The `animationEnd` event runs after a CSS or motion animation finishes. It is useful for cleaning up temporary state, changing visibility, or starting the next transition only after the current animation has completed.