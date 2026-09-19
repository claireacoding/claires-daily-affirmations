const STORAGE_KEY = "daily-affirmations:favorites";

const AFFIRMATIONS = [
  "I can take the next small step without knowing the whole path.",
  "Steady work counts, even when it is quiet.",
  "I am allowed to move at a pace I can keep.",
  "Showing up today is enough to begin.",
  "I can hold high standards and still be kind to myself.",
  "Progress is allowed to look ordinary.",
  "I do not have to earn rest before I take it.",
  "I can start again from here.",
  "My attention is a resource I can spend with care.",
  "I am capable of finishing what I begin, one piece at a time.",
  "I can notice what is hard without making it mean I am failing.",
  "Consistency is a kindness I offer my future self.",
  "I can ask for help and still be competent.",
  "Today’s work does not have to be impressive to be useful.",
  "I am allowed to protect my energy.",
  "I can choose the next right thing, not the perfect thing.",
  "Learning slowly is still learning.",
  "I can keep a promise to myself in a small way today.",
  "I am not behind. I am here.",
  "I can leave room for things to take the time they take.",
  "I treat unfinished work as information, not a verdict.",
  "I can be ambitious and still be gentle.",
  "A clear next step is more useful than a grand plan.",
  "I am allowed to do less so I can do it well.",
  "I can return to the work after I step away.",
  "My worth is not measured by today’s output.",
  "I can make a small correction without starting over.",
  "I belong in the rooms I have walked into.",
  "I can hold uncertainty and still take action.",
  "Careful is not the same as afraid.",
  "I can keep going without rushing.",
  "I am building something by repeating simple things.",
  "I can say no and still be generous.",
  "Today’s effort is enough for today.",
  "I can trust that practice compounds.",
  "I am allowed to change my mind when I learn more.",
  "I can be proud of work that no one sees yet.",
  "I do not have to do everything at once.",
  "I can meet myself where I actually am.",
  "A good system is one I will still use on a tired day.",
  "I can be curious instead of harsh.",
  "I am capable of handling what this day holds.",
  "I can leave something unfinished overnight.",
  "I choose progress I can sustain.",
  "I can listen to my limits without abandoning my goals.",
  "I am allowed to take up space while I figure it out.",
  "I can do today’s work with a steady hand.",
  "I do not need a new version of myself to begin.",
  "I can keep my word to myself in small, honest ways.",
  "I am here, and that is a solid place to start.",
  "I can let a good-enough draft move the work forward.",
  "Patience with the process is part of the work.",
  "I can notice a win without immediately raising the bar.",
  "I am allowed to go slowly and still be going somewhere.",
  "I can carry my goals without carrying them all at once.",
];

const dateLabel = document.getElementById("date-label");
const affirmationEl = document.getElementById("affirmation");
const saveBtn = document.getElementById("save-btn");
const saveStatus = document.getElementById("save-status");
const favCount = document.getElementById("fav-count");
const favoritesEmpty = document.getElementById("favorites-empty");
const favoritesList = document.getElementById("favorites-list");

const today = new Date();
const todaysAffirmation = AFFIRMATIONS[dailyIndex(today, AFFIRMATIONS.length)];

dateLabel.textContent = formatSoftDate(today);
affirmationEl.textContent = todaysAffirmation;
renderFavorites();
updateSaveButton();

saveBtn.addEventListener("click", () => {
  const favorites = readFavorites();
  const alreadySaved = favorites.includes(todaysAffirmation);

  if (alreadySaved) {
    writeFavorites(favorites.filter((line) => line !== todaysAffirmation));
    saveStatus.textContent = "Removed from favorites.";
  } else {
    writeFavorites([todaysAffirmation, ...favorites]);
    saveStatus.textContent = "Saved to favorites.";
  }

  renderFavorites();
  updateSaveButton();
});

favoritesList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  const line = button.getAttribute("data-remove");
  writeFavorites(readFavorites().filter((saved) => saved !== line));
  saveStatus.textContent = "Removed from favorites.";
  renderFavorites();
  updateSaveButton();
});

function formatSoftDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function dailyIndex(date, length) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let seed = year * 10000 + month * 100 + day;

  seed = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
  seed = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
  seed = (seed ^ (seed >>> 16)) >>> 0;

  return seed % length;
}

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((line) => typeof line === "string") : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function updateSaveButton() {
  const saved = readFavorites().includes(todaysAffirmation);
  saveBtn.setAttribute("aria-pressed", String(saved));
  saveBtn.textContent = saved ? "Saved to favorites" : "Save to favorites";
}

function renderFavorites() {
  const favorites = readFavorites();
  favCount.textContent = String(favorites.length);
  favoritesEmpty.hidden = favorites.length > 0;
  favoritesList.replaceChildren();

  for (const line of favorites) {
    const item = document.createElement("li");
    item.className = "favorite-item";

    const text = document.createElement("p");
    text.textContent = line;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-fav";
    remove.setAttribute("data-remove", line);
    remove.setAttribute("aria-label", `Remove from favorites: ${line}`);
    remove.textContent = "Remove";

    item.append(text, remove);
    favoritesList.append(item);
  }
}
