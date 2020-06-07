<script type="typescript">
  import { client } from "../data";
  import { query, mutate } from "svelte-apollo";
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { onMount } from "svelte";
  import CalendarEvent from "../components/calendar-event/calendar-event.svelte";
  import { calendarEvents as eventsStore } from "../store/calendar-events";
  import { user, getUserCalendars } from "../store/user.ts";
  import { get } from "svelte/store";
  import { editEvent, clear } from "../store/edit-event";
  import Button from "../components/buttons/small-fab.svelte";

  let showModal: boolean = false;
  let startDate: Date;
  let endDate: Date;
  let calendarEvents: any[];
  let calendar: any;
  let calendarDiv: any;

  eventsStore.subscribe((events) => {
    calendarEvents = events?.map((event, index) => ({
      id: index,
      title: event.title,
      start: event.startDate,
      end: event.endDate,
      extendedProperties: { description: event.description },
    }));

    if (calendarDiv) {
      calendar.removeAllEventSources();
      calendar.addEventSource(calendarEvents);
    }
  });

  const modalClosed = () => {
    showModal = false;
    editEvent.set(undefined);
  };

  user.subscribe(async (value) => {});
  const eventClicked = (info) => {
    console.log(info);
    const id = info.event.id;
    editEvent.update(() => calendarEvents.find((e) => +e.id === +id));
    startDate = info.event.start;
    endDate = info.event.end;
    showModal = true;
  };

  onMount(() => {
    calendar = new Calendar(calendarDiv, {
      plugins: [dayGridPlugin, interactionPlugin],
      selectable: true,
      events: calendarEvents,
      editable: true,
      eventClick: eventClicked,

      height: () => {
        let intViewportHeight = window.innerHeight;
        return intViewportHeight - 100;
      },
    });
    calendar.on("dateClick", function (info) {
      console.log(info);
      startDate = info.date;
      endDate = info.date;

      showModal = true;
    });
    calendar.on("select", function (info) {
      console.log(info);
      startDate = info.start;
      endDate = info.end;
      showModal = true;
    });
    calendar.on("viewSkeletonRender", (info) => {
      const { view } = info;
    });
    calendar.on("eventDrop", (info) => {
      console.log(info);
    });

    calendar.render();
  });
  const setShowModal = () => {
    showModal = true;
  };
</script>

{#if showModal}
  <CalendarEvent {showModal} {modalClosed} {startDate} {endDate} />
{/if}
<div class="calendar" bind:this={calendarDiv} />
<Button
  type="button"
  size="small"
  color="blue"
  classes="fixed bottom-0 right-0 mb-10 mr-10 z-10"
  title="Add Event"
  onClick={setShowModal} />
