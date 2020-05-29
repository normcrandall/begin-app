import { writeable } from "svelte/store";

let calendarEvents = [];

const { subscribe, set, update } = writeable(calendarEvents);

const reset = () => {
  set([]);
};

const update = (calendarEvent) =>
  update((calendarEvent) => {
    return [...calendarEvents, calendarEvents];
  });

const fill = (calendarEvents) => {
  set(calendarEvents);
};

export { subscribe, reset, update, fill };
