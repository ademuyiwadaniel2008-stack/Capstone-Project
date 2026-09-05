# Planet — Explore Our Solar System Through Data

A data-driven solar system explorer built with HTML, CSS, and  JavaScript for the
TSAcademy Frontend Capstone Project. It fetches planet data via the Fetch API, renders a responsive
image gallery, displays a static comparative facts table, and includes a validated contact form.


## Group: [Group 21]

## Team Members
- [Ademuyiwa Daniel](https://github.com/ademuyiwadaniel2008-stack)

## Live Demo
Deployment link: _add once deployed_

## Project Structure

```
.
├── index.html          Page structure / markup
├── css/
│   └── styles.css      All styling, design tokens, responsive rules
├── js/
│   └── script.js       Fetch API gallery, video control, form validation & submission
├── data/
│   └── planets.json    Local seed data matching the course API's response shape
└── assets/
    └── videos/         Drop your explainer video file here (see note below)
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

## Notes for the team

- **Video:** add your own explainer clip to `assets/videos/solar-system-overview.mp4` (the
  `<video>` tag is already wired for autoplay, muted, loop, per the spec).
- **Contact endpoint:** `CONTACT_ENDPOINT` in `js/ts.js` is a placeholder — swap in the real
  submission endpoint from the assignment brief.
- **Meta author tag:** update `<meta name="author">` in `ts.html` with the group name.
- **Footer:** swap the bracketed placeholders in the About blurb and the `Groupname` credit link
  for your team's real details and repo URL.
