import { Store } from "pullstate";

export const UIStore = new Store({
  token: localStorage.getItem('token') || null,
});