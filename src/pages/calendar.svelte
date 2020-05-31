<script type="typescript">
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { onMount } from "svelte";
  import CalendarEvent from "../calendar-event/calendar-event.svelte";
  import { subscribe } from "../store/calendar-events";

  let showModal: boolean = false;
  let startDate: Date;
  let endDate: Date;
  let calendarEvents: any[];
  let calendar: any;
  let calendarDiv: any;
  subscribe((events) => {
    console.log(events);
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
