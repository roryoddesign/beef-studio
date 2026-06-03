# Beef Studio

A boutique design studio based in Boston. This is the studio's website — a small, hand-coded static site (HTML, CSS, JS — no frameworks, no build tools).

## Structure

```
beef-studio/
├── index.html      Home
├── work.html       Work / portfolio
├── about.html      About
├── contact.html    Contact
├── css/style.css   Shared stylesheet
├── js/main.js      Shared script (footer year, mobile nav)
├── assets/         Images and other static media
├── vercel.json     Vercel deploy config
└── .gitignore
```

## Run locally

It's just static files, so anything that serves a directory works. A couple of options:

```sh
# Python 3
python3 -m http.server 8000

# Node (no install needed if you have npx)
npx serve .
```

Then open <http://localhost:8000> in a browser.

## Deploy

Configured for [Vercel](https://vercel.com) as a static site (`vercel.json` handles clean URLs and trailing-slash behavior). Push to the connected repo and Vercel takes it from there.

## Status

Skeleton only — all copy and imagery is placeholder. Real content lands in a later pass.
