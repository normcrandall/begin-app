import { writable } from "svelte/store";
import { client } from "../data/index";
import { getCalendars } from "../data/queries/index.ts";
import { createCalendar } from "../data/mutations/index.ts";

import { auth } from "../helpers/firebase.js";
export const user = writable({
  loggedIn: false,
  userId: null,
  calendars: [],
  loggingIn: true,
});

export const getUserCalendars = async (uid) => {
  const { userId } = user.userId;
  const { data } = await client.query({
    query: getCalendars,
    variables: {
      where: { userId: { _eq: uid } },
    },
  });
  if (data) {
    const { calendarQuery } = data;
    if (!calendarQuery || calendarQuery.length === 0) {
      const cal = await client.mutate({
        mutation: createCalendar,
        variables: {
          objects: { isDefault: true, name: "Default", userId: uid },
        },
      });

      user.set({
        loggedIn: true,
        userId: uid,
        calendars: [],
        loggingIn: false,
      });
    } else {
      user.set({
        loggedIn: true,
        userId: uid,
        calendars: calendarQuery,
        loggingIn: false,
      });
    }
  }
};
export const setAuth = () => {
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        const { uid } = loggedInUser;
        console.log("loggedIn", loggedInUser);

        getUserCalendars(loggedInUser.uid);
        resolve();
      } else {
        user.set({
          loggedIn: false,
          userId: undefined,
          clandars: [],
          loggingIn: false,
        });
        resolve();
      }
    });
  });
};

export const signout = () => {
  console.log("signing out");
  auth()
    .signOut()
    .then(function () {
      user.set({
        loggedIn: false,
        userId: undefined,
        clandars: [],
        loggingIn: false,
      });
    })
    .catch(function (error) {
      user.set({
        loggedIn: false,
        userId: undefined,
        clandars: [],
        loggingIn: false,
      });
    });
};
