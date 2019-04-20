import browser from "webextension-polyfill";
import { logActiveTab } from "./Message";

function log(prop, payload) {
  logActiveTab(`${prop} mutate to ${payload}`);
}

export async function saveStorage(storageKey, data) {
  try {
    const storage = await readStorage(storageKey);

    return await browser.storage.local.set({
      [storageKey]: Object.assign(storage, data)
    });
  } catch (error) {
    console.log(error);
  }
}

export async function readStorage(storageKey) {
  const storage = await browser.storage.local.get({
    [storageKey]: {} // Opera doesn't need this, but Chrome/Firefox does.
  });

  return storage[storageKey];
}

const store = {
  debug: false,
  state: {
    panel: "history",
    langFrom: null,
    langTo: null,
    currentTranslation: null
  },
  setDebug(payload) {
    if (payload) log("debug", payload);

    this.debug = payload;
  },
  set(prop, payload) {
    if (this.debug) log(prop, payload);

    this.state[prop] = payload;
  },
  get(prop) {
    return this.state[prop];
  }
};

export async function loadSettings() {
  const settings = await readStorage("settings");

  if (settings.langFrom && settings.langTo) {
    store.set("langFrom", settings.langFrom);
    store.set("langTo", settings.langTo);
  }

  return settings;
}

export function saveLangSetting(stateProp, value) {
  store.set(stateProp, value);

  return saveStorage("settings", {
    [stateProp]: value
  });
}

export async function getRankings() {
  const rankings = {};
  const history = await readStorage("tsCache");
  const limit = 8;

  const historyList = Object.entries(history).map(x => {
    x[1].cDate = new Date(x[1].time);

    return x[1];
  });

  // Latest.
  rankings.latest = historyList
    .sort((a, b) => {
      return a.time > b.time ? -1 : a.time < b.time ? 1 : 0;
    })
    .slice(0, limit);

  // Popular.
  const minTime = Date.now() - 3600 * 24 * 30 * 1000; // A month ago.

  rankings.popular = historyList
    .filter(x => {
      return x.time >= minTime;
    })
    .sort((a, b) => {
      return a.hits > b.hits ? -1 : a.hits < b.hits ? 1 : 0;
    })
    .slice(0, limit);

  return rankings;
}

export default store;
