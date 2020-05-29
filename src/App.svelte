<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { onMount } from "svelte";
  import CalendarEvent from "./calendar-event/calendar-event.svelte";
  import "~@fullcalendar/core/main.min.css";
  let calendarDiv;

  onMount(() => {
    var calendarEl = document.getElementById("calendar");

    let calendar = new Calendar(calendarDiv, {
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: () => {
        alert("clicked");
      }
    });
    calendar.on("dateClick", function(info) {
      console.log("clicked on " + info.dateStr);
    });
    calendar.render();
  });

  export let name;
</script>

<Tailwindcss />
<main>
  <CalendarEvent />
  <h1 class="bg-green-400 text-2xl text-center">Hello {name}!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
  <div class="calendar" bind:this={calendarDiv} />
</main>
