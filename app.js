const STORAGE_KEY = "daily-affirmations:favorites";

const HEART_PATH =
  "M12 20.7 10.7 19.5C5.4 14.7 2 11.6 2 7.9 2 4.9 4.4 2.5 7.4 2.5c1.7 0 3.4.8 4.6 2.1 1.2-1.3 2.9-2.1 4.6-2.1 3 0 5.4 2.4 5.4 5.4 0 3.7-3.4 6.8-8.7 11.6L12 20.7z";

const CATEGORIES = [
  {
    id: "money",
    label: "Money & abundance",
    salt: 17,
    lines: [
      "I can treat money as a tool I learn to handle with care.",
      "There is enough time to build a steady financial life.",
      "I can earn without abandoning what matters to me.",
      "I notice what I already have before I reach for more.",
      "A clear next money decision is enough for today.",
      "I can spend on purpose and still leave room to save.",
      "Abundance can look like enough, not excess.",
      "I am allowed to want more without shaming myself for wanting it.",
      "I can talk about money without making it mean I am greedy.",
      "Small, repeated choices are how I grow what I have.",
      "I can ask a fair price for work I stand behind.",
      "I do not have to rush a financial decision to prove I am capable.",
      "I can receive help, payment, and good fortune without apologizing.",
      "My worth is not the same as my income.",
      "I can look at my numbers without turning away.",
      "I leave room for money to arrive through honest work.",
      "I can choose the long path when the shortcut costs too much peace.",
      "Having enough today is a form of wealth I can practice seeing.",
      "I can plan for later and still live this day.",
      "I am allowed to build security at a pace I can keep.",
      "I treat generosity and prudence as partners, not opposites.",
      "I can make one money habit hold, even when the rest is messy.",
      "I can let a modest surplus be a win.",
      "I do not have to wait until I feel rich to practice being responsible.",
    ],
  },
  {
    id: "health",
    label: "Health & clarity",
    salt: 29,
    lines: [
      "I can listen to my body without arguing with it.",
      "Clear thinking comes more easily when I am not rushing.",
      "I am allowed to rest before I am empty.",
      "I can take the next kind step for my health today.",
      "A walk, a meal, a pause — small care still counts.",
      "I do not have to earn the right to feel well.",
      "I can notice tension and let my shoulders drop.",
      "Clarity grows when I do one thing at a time.",
      "I can drink water, eat something decent, and call that a start.",
      "Sleep is part of the work, not a reward after it.",
      "I can move my body in a way that feels like support, not punishment.",
      "I am allowed to protect my attention from noise.",
      "I can choose quiet when my mind is crowded.",
      "Healing does not have to be dramatic to be real.",
      "I can stop when I have done enough for this body today.",
      "Fresh air and a slower breath are available to me.",
      "I treat energy as something I budget, not something I spend until it is gone.",
      "I can ask what would make this hour kinder to me.",
      "I do not need a perfect routine to take care of myself.",
      "I can let a symptom be information, not a story about failure.",
      "I choose food, rest, and movement I can repeat tomorrow.",
      "A clear mind is allowed to take time to arrive.",
      "I can put the phone down and give my eyes a real rest.",
      "I am allowed to feel tired without turning it into a character flaw.",
    ],
  },
  {
    id: "self",
    label: "Self & mindset",
    salt: 41,
    lines: [
      "I can take the next small step without knowing the whole path.",
      "I am allowed to move at a pace I can keep.",
      "Showing up today is enough to begin.",
      "I can hold high standards and still be kind to myself.",
      "Progress is allowed to look ordinary.",
      "I can start again from here.",
      "I can notice what is hard without making it mean I am failing.",
      "Consistency is a kindness I offer my future self.",
      "I can choose the next right thing, not the perfect thing.",
      "I am not behind. I am here.",
      "I can be ambitious and still be gentle.",
      "My worth is not measured by today’s output.",
      "I belong in the rooms I have walked into.",
      "I can hold uncertainty and still take action.",
      "I can keep going without rushing.",
      "I can meet myself where I actually am.",
      "I can be curious instead of harsh.",
      "I do not need a new version of myself to begin.",
      "I am here, and that is a solid place to start.",
      "I can notice a win without immediately raising the bar.",
      "I am allowed to go slowly and still be going somewhere.",
      "I can carry my goals without carrying them all at once.",
      "Careful is not the same as afraid.",
      "I can keep a promise to myself in a small way today.",
    ],
  },
];

const dateLabel = document.getElementById("date-label");
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

dateLabel.textContent = formatSoftDate(today);
renderCards();
renderFavorites();

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
