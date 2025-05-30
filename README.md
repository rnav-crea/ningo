# NINGO: Search Engine

NINGO is a JavaScript-based Wikipedia search engine that allows users to search for Wikipedia articles in a clean  UI. It includes real-time suggestions, spell correction, and a read-more preview using iframe embedding.

## Features

- Search suggestions using Wikipedia API.
- Spell correction using the [Datamuse API](https://www.datamuse.com/api/).
- Displays title, thumbnail image, and summary of the Wikipedia article.
- Full article preview with an embedded iframe on clicking **Read More**.
- Fully responsive for mobile and desktop devices.

## Project Structure

ningo/
├── index.html # Main HTML file
├── styles.css # Styling for the app
├── script.js # Main JavaScript logic
└── README.md # Project documentation

## How It Works

1. User types a query into the search bar.
2. The input is cleaned (removing common fillers like "what is", "about", etc.).
3. The app queries Wikipedia's Summary API.
4. If the article is not found, Datamuse API provides the closest match suggestion.
5. The summary and thumbnail are shown.
6. Clicking **Read More** embeds the full article in an iframe without leaving the page.

## Responsive Design

- Utilizes flexbox layout and media queries.
- Adapts iframe and text/image layout to suit different screen sizes.

## Technologies Used

- HTML5 + CSS3
- JavaScript (ES6)
- Fetch API
- Wikipedia REST API
- Datamuse API

## Future Improvements

- Add voice search input.
- Include article categories or related links.
- Dark mode toggle.
- Save favorite searches.
"# ningo" 
