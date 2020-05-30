import { writable } from "svelte/store";

const calendarEvents = writable([]);

const reset = () => {
  set([]);
};

const addEvent = (calendarEvent) =>
  calendarEvents.update((events) => {
    console.log("calendarEvents", events);
    return [...events, calendarEvent];
  });

const fill = (calendarEvents) => {
  set(calendarEvents);
};

const subscribe = calendarEvents.subscribe;

export { subscribe, reset, addEvent, fill };
