import { writable, get } from "svelte/store";
import { user } from "./user.ts";
import { client } from "../data";
import { insertActivity, updateActivity } from "../data/mutations/index.ts";
import { getActivities } from "../data/queries/index.ts";
import { dataset_dev } from "svelte/internal";

const event = {
  startTime: "12:00AM",
  endTime: "12:00AM",
  startHour: 12,
  startMinute: 0,
  startAmPm: "AM",
  endHour: 12,
  endMinute: 0,
  endAmPm: "AM",
  title: "",
  description: "",
  isAllDay: false,
  activityType: 0,
  id: 0,
  calendar: 0,
  start: new Date(),
  end: new Date(),
};

export const editEvent = writable(event);
export const calendarEvents = writable([]);

export const clear = () => {
  editEvent.set(event);
};

const parseDaytime = (time) => {
  let [hours, minutes] = time
    .substr(0, time.length - 2)
    .split(":")
    .map(Number);
  if (time.includes("pm") && hours !== 12) hours += 12;
  if (time.includes("am") && hours === 12) hours -= 12;
  console.log("hours", hours);
  return 1000 /*ms*/ * 60 /*s*/ * (hours * 60 + minutes);
};

export const getCalendarEvents = async (start, end, calendarId) => {
  const { data } = await client.query({
    query: getActivities,
    variables: {
      id: calendarId,
      where: { start: { _gte: start }, _and: { end: { _lte: end } } },
    },
  });

  calendarEvents.update((events) => {
    return data.calendar.activities.map((a) => {
      return {
        ...a,
        start: new Date(Date.parse(a.start + "-0000")),
        end: new Date(Date.parse(a.end + "-0000")),
      };
    });
  });
};

//   query:  query getActivities($where: maketime_activity_bool_exp, $id: Int!) {
//   calendar(id: $id) {
//     activities(where: $where){
//       id
//       start
//       end
//       description
//       title
//       activityType
//       title
//     }
//   }
// }

export const updateEvent = async () => {
  editEvent.update(async (event) => {
    // let startDate = new Date(event.start);
    // startDate.setHours(0);
    // startDate.setMinutes(0);
    // startDate = new Date(
    //   startDate.getTime() +
    //     parseDaytime(
    //       `${event.startHour}:${event.startMinute}${
    //         event.startAmPm?.toLowerCase() || "am"
    //       }`
    //     )
    // );

    // let endDate = new Date(event.end);
    // endDate.setHours(0);
    // endDate.setMinutes(0);
    // endDate = new Date(
    //   endDate.getTime() +
    //     parseDaytime(
    //       `${event.endHour}:${event.endMinute}${
    //         event.endAmPm?.toLowerCase() || "am"
    //       }`
    //     )
    // );
    // event.start = startDate;
    // event.end = endDate;
    console.log("event to save", event);

    await client.mutate({
      mutation: updateActivity,
      variables: {
        set: {
          start: event.start.toUTCString(),
          end: event.end.toUTCString(),
          title: event.title,
          description: event.description,
          allDay: false,
          cancelled: false,
          calendarId: get(user).calendars[0].id,
        },
        where: { id: { _eq: +event.id } },
      },
    });

    calendarEvents.update((events) => {
      const index = events.findIndex((e) => +e.id === +event.id);

      const current = {
        ...events.find((e) => +e.id === +event.id),
        ...event,
      };

      const newEvents = [
        ...events.slice(0, index),
        ...[current],
        ...events.slice(index + 1),
      ];
      console.log(newEvents);
      return newEvents;
    });
    return event;
  });
};

export const saveEvent = async () => {
  let data;
  editEvent.update(async (event) => {
    let startDate = new Date(event.start);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate = new Date(
      startDate.getTime() +
        parseDaytime(
          `${event.startHour}:${event.startMinute}${
            event.startAmPm ? event.startAmPm.toLowerCase() : "am"
          }`
        )
    );

    let endDate = new Date(event.end);
    endDate.setHours(0);
    endDate.setMinutes(0);
    endDate = new Date(
      endDate.getTime() +
        parseDaytime(
          `${event.endHour}:${event.endMinute}${
            event.endAmPm ? event.endAmPm.toLowerCase() : "am"
          }`
        )
    );
    event.start = startDate.toUTCString();
    event.end = endDate.toUTCString();
    if (event.id === 0) {
      const res = await client.mutate({
        mutation: insertActivity,
        variables: {
          objects: {
            start: event.start,
            end: event.end,
            title: event.title,
            description: event.description,
            allDay: false,
            cancelled: false,
            calendarId: get(user).calendars[0].id,
          },
        },
      });
      data = res.data;
      // event.id = +data.insert_maketime_activity.returning[0].id;
    } else {
      const res = await client.mutate({
        mutation: updateActivity,
        variables: {
          set: {
            start: event.start,
            end: event.end,
            title: event.title,
            description: event.description,
            allDay: false,
            cancelled: false,
            calendarId: get(user).calendars[0].id,
          },
          where: { id: { _eq: +event.id } },
        },
      });
      data = res.data;
    }

    calendarEvents.update((events) => {
      if (event.id !== 0) {
        const index = events.findIndex((e) => +e.id === +event.id);

        const current = {
          ...events.find((e) => +e.id === +event.id),
          ...{
            ...event,
            start: new Date(Date.parse(event.start + "-0000")),
            end: new Date(Date.parse(event.end + "-0000")),
          },
        };

        const newEvents = [
          ...events.slice(0, index),
          ...[current],
          ...events.slice(index + 1),
        ];
        console.log(newEvents);
        return newEvents;
      } else {
        event.id = +data.insert_maketime_activity.returning[0].id;

        return [
          ...events,
          {
            ...event,
            start: new Date(Date.parse(event.start + "-0000")),
            end: new Date(Date.parse(event.end + "-0000")),
          },
        ];
      }
    });
    return event;
  });
};
