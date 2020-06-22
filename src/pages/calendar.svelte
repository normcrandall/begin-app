<script type="typescript">
  import { client } from "../data";
  import { query, mutate } from "svelte-apollo";
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { onMount } from "svelte";
  import CalendarEvent from "../components/calendar-event/calendar-event.svelte";
  import {
    calendarEvents,
    updateEvent,
    getCalendarEvents,
  } from "../store/edit-event";
  import { user, getUserCalendars } from "../store/user.ts";
  import { get } from "svelte/store";
  import { editEvent, clear, saveEvent } from "../store/edit-event";
  import Button from "../components/buttons/small-fab.svelte";

  let showModal: boolean = false;
  let startDate: Date;
  let endDate: Date;

  let calendar: any;
  let calendarDiv: any;
  let activeStart: any;
  let activeEnd: any;

  calendarEvents.subscribe((events) => {
    const mappedEvents = events?.map?.((event, index) => {
      console.log("mapping event", event);
      return {
        id: +event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.description,
      };
    });

    if (calendarDiv && mappedEvents) {
      calendar.removeAllEventSources();
      calendar.addEventSource(mappedEvents);
    }
  });

  const modalClosed = () => {
    showModal = false;
    clear();
  };

  const eventClicked = (info) => {
    const id = +info.event.id;
    console.log("events", $calendarEvents);
    const event = $calendarEvents.find((e) => +e.id === +id);
    editEvent.update(() => event);
    showModal = true;
  };

  const updateDraggedEvent = async (info) => {
    const event = info.event;
    console.log("info", info);
    const newEvent = {
      start: new Date(event.start),
      end: new Date(event.end),
      title: event.title,
      description: event.extendedProps.description,
      allDay: false,
      cancelled: false,
      calendarId: get(user).calendars[0].id,
      id: event.id,
    };
    editEvent.update((e) => ({
      ...e,
      ...newEvent,
    }));
    await updateEvent();
  };
  user.subscribe((user) => {
    getCalendarEvents(activeStart, activeEnd, user.calendars[0].id);
  });

  onMount(() => {
    calendar = new Calendar(calendarDiv, {
      plugins: [dayGridPlugin, interactionPlugin],
      selectable: true,
      events: [],
      editable: true,
      eventClick: eventClicked,

      height: () => {
        let intViewportHeight = window.innerHeight;
        return intViewportHeight - 100;
      },
    });
    calendar.on("dateClick", function (info) {
      const start = info.date;
      const end = info.date;

      editEvent.update((e) => ({
        ...e,
        ...{ start: start, end: end },
      }));

      showModal = true;
    });
    calendar.on("select", function (info) {
      console.log(info);
      startDate = info.start;
      endDate = info.end;
      showModal = true;
    });
    calendar.on("viewSkeletonRender", (info) => {
      (activeStart = info.view.activeStart), (activeEnd = info.view.activeEnd);
    });
    calendar.on("eventDrop", updateDraggedEvent);

    calendar.render();
  });
  const setShowModal = () => {
    showModal = true;
  };
  // $: getCalendarEvents(activeStart, activeEnd, $user)
</script>

{#if showModal}
  <CalendarEvent {showModal} {modalClosed} />
{/if}
<div class="calendar" bind:this={calendarDiv} />
<Button
  type="button"
  size="small"
  color="blue"
  classes="fixed bottom-0 right-0 mb-10 mr-10 z-10"
  title="Add Event"
  onClick={setShowModal} />
