**Debounced**

A technique that runs an action only after activity stops for a set interval.

- **Why it is used:** Prevents repeated API calls while typing a city in the weather search, improving performance and user experience.
  
- **How it works:** A timer is created and reset on each event, the target function only take place when the timeout runs out
- **Example:**

```js
function debounce(fn, wait = 300) {
	let timer;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn(...args), wait);
	};
}

const searchDebounced = debounce(searchCity, 400);
input.addEventListener('input', (e) => searchDebounced(e.target.value));
```
*In this project is not used a function as we use the debounce technique 1 time*

---

**Custom Elements**

The Web Components API feature for defining custom HTML elements with their own logic and lifecycle (`connectedCallback`, `disconnectedCallback`, etc.).

- **Why it was used:** Reusable UI (e.g., forecast card, temperature widget) with behavior and styles isolated from the rest of the page.
  
- **How it works:** Create a class extending `HTMLElement`, implement lifecycle callbacks, and register it with `customElements.define('my-card', MyCard)`.
- **Example:**

```js
class WeatherCard extends HTMLElement {
	constructor(){
        super()
        this.attachShadow({mode: 'open'}) //DOM Isolation
    }

    render(){
        this.shadowRoot.innerHTML= ``
    }

    connectedCallback(){
        this.render()
    }
}
customElements.define('weather-card', WeatherCard);
```

Tip: Use Shadow DOM for full style encapsulation if you need isolation

---

**Reflow (using `void glassbox.offsetWidth`)**

A reflow is the browser recalculating layout when styles or the DOM change; forcing reflow is expensive if done often.

- **Why it was used:** Restart a CSS animation by forcing the browser to recompute layout before re-adding the class.
  
- **How it works:** Reading a layout property (like `offsetWidth`) forces a synchronous reflow; `void element.offsetWidth` reads and discards the value `void`.
- **Example (restart animation):**

```js
element.classList.remove('anim');
void element.offsetWidth;
element.classList.add('anim');
```

Caution: Forcing reflow impacts performance if repeated, use it only when necessary.
