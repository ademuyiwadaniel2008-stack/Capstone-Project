# Planet — Explore Our Solar System Through Data

Planet — Explore Our Solar System Through Data is an interactive, data-driven web application built with HTML, CSS, and  JavaScript as a capstone project for TS Academy . The application provides an educational overview of the solar system by presenting measurable planetary physical properties—such as mass, diameter, gravity, density, and distance from the Sun—in a structured and visually appealing format. 

It fetches planet data via the Fetch API, renders a responsive image gallery, displays a static comparative facts table, and includes a validated contact form.


## Group: [Group 21]

## Team Members
- [Ademuyiwa Daniel](https://github.com/ademuyiwadaniel2008-stack)

## Live Demo
Deployment link: https://ademuyiwa-tsacademy-project.netlify.app

## Project Structure

```
.
├── index.html          Page structure / markup
├── css/
│   └── styles.css      All styling, design tokens, responsive rules
├── js/
│   └── script.js       Fetch API gallery, video control, form validation & submission
└── images/
                        Local image of the favicon(svg and png) and hero plaent(png)
```

## Components / Sections

- Header / logo
- Hero
- About (video)
- Gallery (Fetch API)
- Facts table
- Contact form
- Footer

## Running Locally

Because the gallery uses `fetch()` to load `data/planets.json`, opening `index.html` directly
from disk (`file://`) will fail in most browsers due to CORS restrictions on local files. Serve
the folder instead:

```bash
# Option 1 — Node
npx serve .

# Option 2 — Python
python3 -m http.server 5173
```

Then visit the printed local URL in your browser.


