import { logActiveTab } from "./Message";

function log(prop, payload) {
  logActiveTab(`${prop} mutate to ${payload}`);
}

const store = {
  debug: false,
  state: {
    panel: "search"
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

export default store;
