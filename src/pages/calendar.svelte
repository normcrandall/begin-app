<script type="typescript">
  import { client } from "../data";
  import { query, mutate } from "svelte-apollo";
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { onMount } from "svelte";
  import CalendarEvent from "../components/calendar-event/calendar-event.svelte";
  import { calendarEvents as eventsStore } from "../store/calendar-events";
  import { user } from "../store/user";
  import { get } from "svelte/store";

  import { getCalendars } from "../data/queries";

  let showModal: boolean = false;
  let startDate: Date;
  let endDate: Date;
  let calendarEvents: any[];
  let calendar: any;
  let calendarDiv: any;
  let editEvent: any;

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
    editEvent = null;
  };

  user.subscribe(async (value) => {
    const { userId } = value;
    const { data } = await client.query<{ calendarQuery: any[] }>({
      query: getCalendars,
      variables: {
        where: { userId: { _eq: userId } },
      },
    });
    if (data) {
      const { calendarQuery } = data;
      if (!calendarQuery || calendarQuery.length === 0) {
      }
    }
  });
  const eventClicked = (info) => {
    console.log(info);
    const id = info.event.id;
    editEvent = calendarEvents.find((e) => +e.id === +id);
    startDate = event.start;
    endDate = event.end;
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
    calendar.on("eventDrop", (info) => {
      console.log(info);
    });

    calendar.render();
  });
</script>

{#if showModal}
  <CalendarEvent {showModal} {modalClosed} {startDate} {endDate} {editEvent} />
{/if}
<div class="calendar" bind:this={calendarDiv} />
