import { writable } from "svelte/store";

export const user = writable({
  loggedIn: false,
  userId: null,
  calendars: [],
});
