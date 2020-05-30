<script lang="typescript">
  import Tailwindcss from "./Tailwindcss.svelte";
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { onMount } from "svelte";
  import CalendarEvent from "./calendar-event/calendar-event.svelte";
  import { subscribe } from "./store/calendar-events";

  let calendarDiv: any;
  const modalClosed = () => {
    showModal = false;
  };
  let showModal: boolean = false;
  let selectedDate: Date = new Date();
  let startDate: Date;
  let endDate: Date;
  let calendarEvents: any[];
  let calendarEl;
  let calendar;
  subscribe((events) => {
    console.log(events);
    calendarEvents = events?.map((event, index) => ({
      id: index,
      title: event.title,
      start: event.startDate,
      end: event.endDate,
    }));
    console.log(calendarDiv);
    if (calendarDiv) {
      console.log("adding events");
      calendar.removeAllEventSources();

      calendar.addEventSource(calendarEvents);
    }
  });

  onMount(() => {
    calendarEl = document.getElementById("calendar");

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

<Tailwindcss />
<main>
  <CalendarEvent {showModal} {modalClosed} {startDate} {endDate} />
  <div class="calendar" bind:this={calendarDiv} />
</main>
