# Aero Weather

Aero Weather is a small front-end weather app that lets the user search for a city and instantly see current weather data for that location. The project is built with plain HTML, CSS, and JavaScript.

## What This Project Does

The app uses two free Open-Meteo APIs:

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to convert a city name into coordinates.
- [Open-Meteo Weather API](https://open-meteo.com/en/docs?hourly=&timezone=auto&current=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min) to fetch the actual weather information for those coordinates.

The flow:

1. The user types a city name.
2. The app searches matching locations using the geocoding API.
3. When a location is selected or submitted, the app fetches weather data for that city.
4. The UI updates with the current temperature, precipitation, weather condition, and icon.

## Features

- City search with live suggestions.
- Debounced geocoding requests to avoid unnecessary API calls.
- Weather lookup based on latitude and longitude.
- Custom weather icon component.
- Clean responsive layout.

## Run

This project is allocated in: **URL**

## Project Structure

- `index.html` - main markup and page structure.
- `style.css` - visual design, layout, and effects.
- `script.js` - application bootstrap and module loading.
- `fetch-location.js` - geocoding search and suggestion list behavior.
- `fetch-weather.js` - weather API integration and DOM updates.
- `web-components.js` - custom weather icon element.
- `images/` - weather icons and app assets.

## How It Works

### Module-Based Architecture

The app is split into small modules instead of keeping everything in one file. `script.js` imports the other modules so each responsibility stays isolated:

- search and autocomplete logic
- weather fetching logic
- the weather icon component

This makes the code easier to read, reuse, and maintain.

### Search and Geocoding

The search input listens for typing events and uses a short delay before sending a request. This debounce prevents a request from being sent on every single keystroke spending all of our free requests.

When the user types a city name, the app calls the Open-Meteo Geocoding API and shows a small list of matching locations. Clicking one of the results fills the input with the selected city name.

### Weather Fetching

When the form is submitted, the app performs a second geocoding request to get a single location result. After that, it uses the latitude and longitude returned by the geocoding API to request the current weather from the Open-Meteo Weather API.


### Weather Code Translation

The weather API returns numeric weather codes. The app translates those codes into readable labels such as sunny, cloudy, rainy, and stormy. Those labels are then used to choose the correct icon and display the text version of the condition.

### Custom Element and Shadow DOM

The weather icon is implemented as a custom element named `weather-icon`. It uses Shadow DOM to isolate its internal markup and styles from the rest of the page.

This technique keeps the icon component self-contained and makes it easy to render different icons based on the current weather state and posterior scalabiscalability.

## UI Techniques

The visual design uses a dark theme with bright blue accents and a glassmorphism-style card. The effect is created with:

- translucent backgrounds
- blur filters
- soft borders and highlights
- layered shadows


## Notable Implementation Details

- The search dropdown is shown only when matching results are available.
- The app includes a default city fallback if no location is found. (By default Madrid)
- The UI is intentionally simple and focused on the core weather interaction.
- The icon component reads its state from a `data-value` attribute.

## Future Improvements

- Add support for more detailed forecasts.
- Store the last searched city in local storage.
- Expand the UI with hourly weather cards or a multi-day forecast.

## Summary

This project demonstrates how to build a clean weather app using only front-end technologies. It combines external APIs, modular JavaScript, debounced search, direct DOM manipulation, and a custom web component to create a focused and interactive user experience.

