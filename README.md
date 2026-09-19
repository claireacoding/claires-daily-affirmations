# Today — Daily Affirmation

A small, calm page that shows **one affirmation for the current calendar day**. Claire can open it in a browser, save a line she wants to keep, and come back tomorrow for a new one.

Same day, same line. The next calendar day picks a different one.

## How to open it

You do not need to install anything.

**Option 1 — open the file**

1. Download or clone this folder.
2. Double-click `index.html`, or right-click it and open it in Chrome, Firefox, Safari, or Edge.

Favorites still work this way. They are stored in the browser, not in the file.

**Option 2 — a simple local server**

If you have Python installed, from this folder run:

```bash
python3 -m http.server 43147
```

Then open [http://127.0.0.1:43147](http://127.0.0.1:43147) in your browser.

## What you will see

- A soft date, like `Friday, Sep 18`
- Today’s affirmation, large in the middle
- **Save to favorites** to keep the line
- A **Favorites** section you can expand. Saved lines stay after a refresh.

To unsave, click the button again, or use **Remove** next to a saved line.

## How the daily pick works

The page looks at **today’s local calendar date** (year, month, and day on your computer). It turns that date into a number, then uses the number to pick one line from the built-in list.

- Opening the page again on the same date shows the same affirmation.
- After midnight, the date changes, so the pick changes.
- It does not use the clock time, only the date.
- It does not talk to a server. The list lives in `app.js`.

The lines are original. They are meant to sound grounded and kind — more “keep going at a pace you can keep” than hype.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The page structure |
| `styles.css` | Layout and look |
| `app.js` | The affirmation list, daily pick, and favorites |
| `favicon.svg` | The tiny tab icon |

Favorites are saved in the browser under the key `daily-affirmations:favorites`. Clearing site data for this page will remove them.
