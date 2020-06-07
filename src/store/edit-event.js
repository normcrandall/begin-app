import { writable } from "svelte/store";

export const editEvent = writable(undefined);

export const clear = () => {
  editEvent.set(undefined);
};
