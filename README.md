# Today — Daily Affirmations

A small, calm page that shows **three affirmations for the current calendar day** — one each for money, health, and self — and **one journaling prompt** to write beside them. Claire can open it in a browser, heart a line she wants to keep, leave a short note for the day, and come back tomorrow for a new set.

Same day, same three lines and the same prompt. The next calendar day picks a new trio and a new question. Notes from earlier days stay on the page.

## How to open it

You do not need to install anything.

**Option 1 — open the file**

1. Download or clone this folder.
2. Double-click `index.html`, or right-click it and open it in Chrome, Firefox, Safari, or Edge.

Favorites and journal notes still work this way. They are stored in the browser, not in the file.

**Option 2 — a simple local server**

If you have Python installed, from this folder run:

```bash
python3 -m http.server 43147
```

Then open [http://127.0.0.1:43147](http://127.0.0.1:43147) in your browser.

## What you will see

- A soft date, like `Friday, Sep 18`
- Three cards for today:
  - **Money & abundance**
  - **Health & clarity**
  - **Self & mindset**
- A small **heart** on each card. Outline means not saved; filled means saved.
- A **Favorites** section you can expand. Each saved line shows the category it came from.
- A **Journal** card with today’s prompt, a place to write, and **Past notes** for earlier days.

Tap a filled heart again to unsave it, including from the favorites list.

Write a few lines and choose **Save today’s note**. Reloading the page keeps today’s text. Saving an empty note clears it. Open **Past notes** to read what you wrote on previous days.

## How the daily pick works

The page looks at **today’s local calendar date** (year, month, and day on your computer). It turns that date into a number, then uses it to pick **one line from each category**.

- Opening the page again on the same date shows the same three affirmations and the same journaling prompt.
- After midnight, the date changes, so each category’s pick and the prompt change.
- It does not use the clock time, only the date.
- It does not talk to a server. The lists live in `app.js` — about 24 original lines in each category, and a short bank of journal prompts.

The lines are original and gently spiritual — presence, trust, gratitude, inner light — without doctrine or hype.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The page structure |
| `styles.css` | Layout and look |
| `app.js` | The category lists, daily picks, heart favorites, and journal |
| `favicon.svg` | The tiny tab icon |

Favorites are saved in the browser under the key `daily-affirmations:favorites`. Journal notes are saved under `daily-affirmations:journal`, one entry per calendar day. Clearing site data for this page will remove both.
