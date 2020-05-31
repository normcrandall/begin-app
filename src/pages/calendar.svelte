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

  eventsStore.subscribe((events) => {
    calendarEvents = events?.map((event, index) => ({
      id: index,
      title: event.title,
      start: event.startDate,
      end: event.endDate,
    }));

    if (calendarDiv) {
      calendar.removeAllEventSources();
      calendar.addEventSource(calendarEvents);
    }
  });

  const modalClosed = () => {
    showModal = false;
  };
  console.log(get(user));

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
  onMount(() => {
    calendar = new Calendar(calendarDiv, {
      plugins: [dayGridPlugin, interactionPlugin],
      selectable: true,
      events: calendarEvents,
      editable: true,
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

<CalendarEvent {showModal} {modalClosed} {startDate} {endDate} />
<div class="calendar" bind:this={calendarDiv} />
