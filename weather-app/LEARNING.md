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

**Form Data**

Use the `FormData` Web API to collect and serialize form inputs . `FormData` reads form controls by name and produces a convenient iterable or key/value access for saving preferences or sending to a backend.

- **Why it's useful:** Simple API for extracting user settings

Example:

```js
const settingsForm = document.querySelector('#settings');
settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(settingsForm);
    const units = fd.get('units');
    const defaultCity = fd.get('defaultCity');
    localStorage.setItem('units', units);
    localStorage.setItem('defaultCity', defaultCity);
});
```

*Consider validating and normalizing values before saving, and providing user feedback after saving.*


**ChartJs**

Chart.js is used to visualize temperature and precipitation trends (daily). Keep chart setup and update logic in `charts.js`.

- **Why it's useful:** Visual summaries help users quickly understand trends and anomalies.
  
- **Best practices:**
    - Initialize charts when we collect all the data using custom Events

[Documentation](https://www.chartjs.org/docs/latest/)

**Scrollbar**

Custom scrollbar styling can improve visual cohesion on desktop browsers.

- **Techniques:** Use CSS pseudo-elements like `::-webkit-scrollbar`, `::-webkit-scrollbar-thumb`, and `scrollbar-color` / `scrollbar-width` for cross-browser support where available.

Example CSS:

```css
/* style.css */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 6px; }
scrollbar-color: var(--accent) transparent;
```

*Avoid hiding scrollbars entirely.*


