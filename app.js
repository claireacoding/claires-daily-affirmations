const STORAGE_KEY = "daily-affirmations:favorites";
const JOURNAL_KEY = "daily-affirmations:journal";

const HEART_PATH =
  "M12 20.7 10.7 19.5C5.4 14.7 2 11.6 2 7.9 2 4.9 4.4 2.5 7.4 2.5c1.7 0 3.4.8 4.6 2.1 1.2-1.3 2.9-2.1 4.6-2.1 3 0 5.4 2.4 5.4 5.4 0 3.7-3.4 6.8-8.7 11.6L12 20.7z";

const CATEGORIES = [
  {
    id: "money",
    label: "Money & abundance",
    salt: 17,
    lines: [
      "I trust there is enough, and I can meet money with an open hand.",
      "My soul is not measured by what I earn.",
      "I can receive what arrives without clutching.",
      "Gratitude for what I have makes room for what comes next.",
      "I treat money as energy I can steward with care.",
      "Abundance begins in how I notice what is already here.",
      "I am allowed to want provision and still stay aligned with my values.",
      "I can give and receive without keeping score in my spirit.",
      "I trust the next honest step with money more than a grand promise.",
      "My inner light is not dimmed by a modest season.",
      "I can look at my numbers with presence, not panic.",
      "I leave space for unexpected good to find me.",
      "I am worthy of enough, and I do not have to prove it.",
      "I can hold ambition in one hand and peace in the other.",
      "What I have can serve a life that feels true.",
      "I release the story that I am always behind.",
      "I can ask a fair price and still stay kind.",
      "Steady, aligned work is a quiet form of faith.",
      "I notice small plenty: a meal, a roof, a little extra.",
      "I can let money support my life without becoming my life.",
      "I am open to provision that does not cost me my peace.",
      "Gratitude steadies me when the numbers feel loud.",
      "I can build security without closing my heart.",
      "I walk toward enough with trust, not scramble.",
      "I can plan with care and still leave room for unexpected provision.",
      "My peace does not have to wait for a bigger number.",
      "I receive today’s resources without rehearsing tomorrow’s fear.",
      "I am allowed to grow wealth that still feels like mine.",
      "I can celebrate a small surplus without needing it to last forever.",
      "Honest work and quiet trust can share the same day.",
      "I release comparison when I look at what I have.",
      "I can spend with intention and still stay soft toward myself.",
      "Enough is a feeling I can practice, not only a total I chase.",
      "I trust slow building more than a sudden fix.",
      "I let generosity include me too.",
      "I can hold a budget as guidance, not as a verdict on my worth.",
    ],
  },
  {
    id: "health",
    label: "Health & clarity",
    salt: 29,
    lines: [
      "I listen for the quiet wisdom of my body.",
      "Clarity returns when I come back to my breath.",
      "I can rest as an act of trust, not as a failure.",
      "My body is a home I can tend with gentleness.",
      "I let my spirit set a pace my body can keep.",
      "Presence is a form of healing I can practice today.",
      "I am allowed to be well without earning it first.",
      "I can meet discomfort with kindness instead of argument.",
      "Inner light does not require me to feel bright every hour.",
      "I choose food, rest, and movement that honor this life.",
      "I can put down the noise and return to myself.",
      "Sleep is a prayer my body already knows.",
      "I trust that healing can be slow and still be real.",
      "A clear mind is allowed to arrive in its own time.",
      "I treat my energy as something sacred to spend with care.",
      "A walk can be a way of coming back to the present.",
      "Peace in the body makes room for peace in the mind.",
      "I do not have to push through every signal I am given.",
      "I am grateful for the breath that is here, now.",
      "I can let this hour be enough for my health.",
      "Alignment feels like less strain, not more effort.",
      "I honor the limits that keep my spirit intact.",
      "I can be tired and still be whole.",
      "I return to stillness when my thoughts run ahead.",
      "I give my nervous system the same patience I give a friend.",
      "A glass of water can be a small return to myself.",
      "I can move gently and still call it care.",
      "Clarity often arrives after I stop forcing it.",
      "I honor hunger, rest, and stillness as real information.",
      "I do not have to diagnose every sensation to respect it.",
      "Fresh air can reset more than I expect.",
      "I let my shoulders drop when I notice I have been bracing.",
      "Healing can look ordinary and still count.",
      "I can choose the quieter option when my body asks for less.",
      "I protect my sleep like it matters, because it does.",
      "I trust that consistency can be kinder than intensity.",
    ],
  },
  {
    id: "self",
    label: "Self & mindset",
    salt: 41,
    lines: [
      "I am here, and my presence is enough to begin.",
      "I can trust the quiet knowing underneath the noise.",
      "My inner light does not have to perform to be real.",
      "I meet myself with the same gentleness I would offer a friend.",
      "I am not behind. I am becoming.",
      "I can take the next small step in alignment with my soul.",
      "Peace is allowed to be a practice, not a prize.",
      "I release the need to be a new person before I start.",
      "Gratitude does not cancel what is hard; it sits beside it.",
      "I belong to this life, even on the unfinished days.",
      "I can hold uncertainty and still stay present.",
      "My worth is not a score I have to improve.",
      "I trust that I can return to myself after I wander.",
      "I am allowed to go slowly and still be guided.",
      "I listen for what feels true, not only what looks impressive.",
      "I can keep a small promise to my spirit today.",
      "I do not have to force a feeling I do not have yet.",
      "Alignment is choosing the next honest thing.",
      "I am held by more than my own effort.",
      "I can notice a quiet joy without immediately asking for more.",
      "My soul does not rush, and I can walk with it.",
      "I let today’s presence be enough for today.",
      "I am already connected to a steadier place inside.",
      "I can begin again without abandoning who I have been.",
      "I can be unfinished and still be trustworthy to myself.",
      "I speak to myself in a tone I would not be ashamed to overhear.",
      "I do not need a dramatic breakthrough to make today meaningful.",
      "I can change my mind when I learn something truer.",
      "Softness is a strength I am allowed to keep.",
      "I am permitted to want less noise and more honesty.",
      "I can outgrow a habit without making myself the enemy.",
      "Today’s courage can be one clear sentence.",
      "I let curiosity lead when certainty is unavailable.",
      "I am allowed to take up space without apologizing for it.",
      "I can hold pride and humility in the same breath.",
      "I return to what is real when my thoughts get theatrical.",
    ],
  },
];

const JOURNAL_PROMPTS = [
  "What felt quietly true today, even if it was small?",
  "Where did you notice enough, even for a moment?",
  "What would you like to thank your body for today?",
  "What are you ready to set down before the day ends?",
  "Where did you feel most like yourself?",
  "What can you meet with gentleness tonight?",
  "What would you like to carry lightly into tomorrow?",
  "Where did peace visit you, even briefly?",
  "If you paused, what did your inner knowing say?",
  "What would enough look like in this hour?",
  "Who or what held you today, even in a small way?",
  "What are you allowed to leave unfinished?",
  "Where did gratitude sit beside something hard?",
  "What small promise can you keep with your spirit tonight?",
  "What do you want to remember about this day?",
  "What is asking for your softness rather than your effort?",
];

const dateLabel = document.getElementById("date-label");
const journalPromptEl = document.getElementById("journal-prompt");
const journalEntry = document.getElementById("journal-entry");
const journalSave = document.getElementById("journal-save");
const journalStatus = document.getElementById("journal-status");
const journalCount = document.getElementById("journal-count");
const journalEmpty = document.getElementById("journal-empty");
const journalList = document.getElementById("journal-list");
const cardsEl = document.getElementById("cards");
const saveStatus = document.getElementById("save-status");
const favCount = document.getElementById("fav-count");
const favoritesEmpty = document.getElementById("favorites-empty");
const favoritesList = document.getElementById("favorites-list");

const today = new Date();
const todaysPicks = CATEGORIES.map((category) => {
  const text = category.lines[dailyIndex(today, category.lines.length, category.salt)];
  return {
    id: favoriteId(category.id, text),
    categoryId: category.id,
    categoryLabel: category.label,
    text,
  };
});

const todayKey = dateKey(today);
const todaysPrompt = JOURNAL_PROMPTS[dailyIndex(today, JOURNAL_PROMPTS.length, 53)];

dateLabel.textContent = formatSoftDate(today);
renderCards();
renderFavorites();
renderJournal();

cardsEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-toggle]");
  if (!button) return;
  toggleFavorite(button.getAttribute("data-toggle"));
});

favoritesList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-toggle]");
  if (!button) return;
  toggleFavorite(button.getAttribute("data-toggle"));
});

journalSave.addEventListener("click", saveTodayJournal);

journalEntry.addEventListener("input", () => {
  if (journalStatus.textContent) journalStatus.textContent = "";
});

function dateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function parseDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatSoftDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function dailyIndex(date, length, salt) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let seed = year * 10000 + month * 100 + day + salt * 7919;

  seed = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
  seed = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
  seed = (seed ^ (seed >>> 16)) >>> 0;

  return seed % length;
}

function favoriteId(categoryId, text) {
  return `${categoryId}:${text}`;
}

function categoryById(categoryId) {
  return CATEGORIES.find((category) => category.id === categoryId);
}

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (!item || typeof item !== "object" || typeof item.text !== "string") return null;
        const category = categoryById(item.categoryId);
        if (!category) return null;
        return {
          id: favoriteId(category.id, item.text),
          categoryId: category.id,
          categoryLabel: category.label,
          text: item.text,
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function writeFavorites(favorites) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      favorites.map(({ id, categoryId, text }) => ({
        id,
        categoryId,
        text,
      })),
    ),
  );
}

function isFavorite(id) {
  return readFavorites().some((item) => item.id === id);
}

function toggleFavorite(id) {
  const current = readFavorites();
  const existing = current.find((item) => item.id === id);

  if (existing) {
    writeFavorites(current.filter((item) => item.id !== id));
    saveStatus.textContent = `Removed from favorites: ${existing.text}`;
  } else {
    const pick = todaysPicks.find((item) => item.id === id);
    if (!pick) return;
    writeFavorites([pick, ...current]);
    saveStatus.textContent = `Saved to favorites: ${pick.text}`;
  }

  renderCards();
  renderFavorites();
}

function heartIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", HEART_PATH);
  svg.append(path);
  return svg;
}

function heartButton(id, text) {
  const saved = isFavorite(id);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "heart";
  button.setAttribute("data-toggle", id);
  button.setAttribute("aria-pressed", String(saved));
  button.setAttribute(
    "aria-label",
    saved ? `Remove from favorites: ${text}` : `Save to favorites: ${text}`,
  );
  button.append(heartIcon());
  return button;
}

function renderCards() {
  cardsEl.replaceChildren();

  for (const pick of todaysPicks) {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("aria-labelledby", `cat-${pick.categoryId}`);

    const top = document.createElement("div");
    top.className = "card-top";

    const category = document.createElement("h2");
    category.className = "category";
    category.id = `cat-${pick.categoryId}`;
    category.textContent = pick.categoryLabel;

    const text = document.createElement("p");
    text.className = "affirmation";
    text.textContent = pick.text;

    top.append(category, heartButton(pick.id, pick.text));
    card.append(top, text);
    cardsEl.append(card);
  }
}

function renderFavorites() {
  const favorites = readFavorites();
  favCount.textContent = String(favorites.length);
  favoritesEmpty.hidden = favorites.length > 0;
  favoritesList.replaceChildren();

  for (const item of favorites) {
    const row = document.createElement("li");
    row.className = "favorite-item";

    const copy = document.createElement("div");
    copy.className = "favorite-copy";

    const category = document.createElement("p");
    category.className = "favorite-category";
    category.textContent = item.categoryLabel;

    const text = document.createElement("p");
    text.textContent = item.text;

    copy.append(category, text);
    row.append(copy, heartButton(item.id, item.text));
    favoritesList.append(row);
  }
}

function readJournal() {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const entries = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
      if (!value || typeof value.text !== "string") continue;
      const text = value.text.trim();
      if (!text) continue;
      entries[key] = {
        prompt: typeof value.prompt === "string" ? value.prompt : "",
        text,
      };
    }
    return entries;
  } catch {
    return {};
  }
}

function writeJournal(entries) {
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

function renderJournal() {
  const saved = readJournal()[todayKey];
  journalPromptEl.textContent = todaysPrompt;
  journalEntry.value = saved ? saved.text : "";
  journalStatus.textContent = saved ? "Saved for today." : "";
  renderJournalHistory();
}

function saveTodayJournal() {
  const text = journalEntry.value.trim();
  const entries = readJournal();
  const hadEntry = Boolean(entries[todayKey]);

  if (!text && !hadEntry) return;

  if (text) {
    entries[todayKey] = { prompt: todaysPrompt, text };
  } else {
    delete entries[todayKey];
  }

  try {
    writeJournal(entries);
    journalEntry.value = text;
    journalStatus.textContent = text ? "Saved for today." : "Cleared today’s note.";
  } catch {
    journalStatus.textContent = "Couldn’t save in this browser.";
  }

  renderJournalHistory();
}

function renderJournalHistory() {
  const past = Object.entries(readJournal())
    .filter(([key]) => key !== todayKey)
    .sort(([a], [b]) => (a < b ? 1 : -1));

  journalCount.textContent = String(past.length);
  journalEmpty.hidden = past.length > 0;
  journalList.replaceChildren();

  for (const [key, entry] of past) {
    const item = document.createElement("li");
    item.className = "journal-item";

    const date = document.createElement("p");
    date.className = "journal-item-date";
    date.textContent = formatSoftDate(parseDateKey(key));

    const text = document.createElement("p");
    text.className = "journal-item-text";
    text.textContent = entry.text;

    item.append(date);
    if (entry.prompt) {
      const prompt = document.createElement("p");
      prompt.className = "journal-item-prompt";
      prompt.textContent = entry.prompt;
      item.append(prompt);
    }
    item.append(text);
    journalList.append(item);
  }
}
