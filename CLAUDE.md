# Beef Studio

## Project overview

Marketing site for **Beef Studio**, a small boutique creative studio. The site is a hand-coded static site — pages for Home, Work, About, and Contact — with no frameworks or build step. See `README.md` for the file layout and how to run locally.

## Collaboration

This project is shared between three collaborators — **Rory**, **Beni**, and **Francis** — all of whom use Claude Code. Anything you write to this file (rules, conventions, context) should be useful to all three. Don't write personal preferences here; those belong in each collaborator's own auto-memory.

## Stack and deploy

- Hand-coded **HTML / CSS / JS**. No frameworks, no bundler, no build step.
- Hosted on **Vercel**, connected to the GitHub repo.
- **`main` auto-deploys to production.** Anything that lands on `main` is live within seconds. Treat `main` as the live site.
- `vercel.json` handles clean URLs and trailing-slash behavior.

## Branching and collaboration rules

- **Never commit directly to `main`.** `main` = production.
- All work happens on a **feature branch**, merged via **pull request**.
- Suggested branch prefixes: `feat/`, `fix/`, `copy/`, `design/`, `docs/`.
- Open the PR against `main`. Let a human review and merge — don't auto-merge.
- Because three people share the repo, keep PRs focused and the description clear about *what* changed and *why*.

## Brand voice and aesthetic

Beef Studio is a **high-altitude / mountain-oriented** creative brand. The aesthetic is:

- **Considered, typographic, and alpine** — editorial and design-forward.
- **Not** outdoorsy in the REI / gear-catalogue sense. No rugged-adventure tropes, no stock-photo summits, no exclamation-mark energy.
- Think: a mountain seen from a quiet room. Restraint over enthusiasm. White space over decoration.

When writing copy or making layout/visual decisions, lean toward calm, precise, and confident. If a choice feels loud or sporty, it's probably wrong for this brand.

## Type system

- **PP Neue Monde Semi Condensed Light** — serif wordmark. Used for the primary "Beef Studio" wordmark.
- **PP Playground Regular** — script logomark. Used as a secondary, more expressive mark.
- **Body copy** and **tertiary accent type** are still **TBD**. If you need a body face before that decision is made, flag it in your PR rather than picking one silently — the choice is load-bearing for the brand.

## Working with this repo

- The site is static, so to preview a change just open the page in a browser or run `python3 -m http.server 8000` from the repo root (see `README.md`).
- Keep changes scoped — small PRs are easier for the other two collaborators to review.
- If you add a new page, update the nav across the existing pages and confirm it works on mobile.
