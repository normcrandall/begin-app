<script lang="typescript">
  import { onMount, onDestroy } from "svelte";
  import { defaultCalendarEvent } from "../../store/calende-event";
  import { calendarEvents as eventsStore } from "../../store/calendar-events";
  import Button from "../buttons/small-fab.svelte";
  import Modal from "../modal/modal.svelte";
  import Text from "../inputs/text.svelte";
  import OutlineButton from "../buttons/outline-button.svelte";
  import DatePicker from "../datepicker/Datepicker.svelte";
  import { editEvent } from "../../store/edit-event";
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutes = ["00", "15", "30", "45"];
  const ampm = ["AM", "PM"];

  export let startDate: any;
  export let endDate: any;
  export let showModal: boolean = false;
  export let modalClosed: () => void;
  let startTime;
  let endTime;
  let startHour;
  let startMinute;
  let startAmPm;
  let endHour;
  let endMinute;
  let endAmPm;
  let title;
  let description;
  let isEdit = false;
  let calendarEvent = { ...defaultCalendarEvent };
  let modalTitle = "Add Calendar Event";
  const getHours = (hours) => {
    return hours > 12 ? 12 - hours : hours;
  };
  let formattedEndDate: string;
  let formattedStartDate: string;

  const setShowModal = () => {
    {
      startDate = new Date();
      endDate = new Date();
      showModal = true;
    }
  };
  const onClose = () => {
    showModal = false;
    modalClosed();
  };
  const parseDaytime = (time) => {
    let [hours, minutes] = time
      .substr(0, time.length - 2)
      .split(":")
      .map(Number);
    if (time.includes("pm") && hours !== 12) hours += 12;
    return 1000 /*ms*/ * 60 /*s*/ * (hours * 60 + minutes);
  };
  const saveEvent = () => {
    eventsStore.update((events) => {
      let startDate = new Date(calendarEvent.startDate);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate = new Date(
        startDate.getTime() +
          parseDaytime(
            `${startHour}:${startMinute}${startAmPm?.toLowerCase() || "am"}`
          )
      );

      let endDate = new Date(calendarEvent.endDate);
      endDate.setHours(0);
      endDate.setMinutes(0);
      endDate = new Date(
        endDate.getTime() +
          parseDaytime(
            `${endHour}:${endMinute}${endAmPm?.toLowerCase() || "am"}`
          )
      );
      calendarEvent.startDate = startDate;
      calendarEvent.endDate = endDate;
      console.log(startDate, endDate);
      if (isEdit) {
        const index = events.findIndex((e) => e.id === calendarEvent.id);

        const current = {
          ...events.find((e) => e.id === calendarEvent.id),
          ...calendarEvent,
        };

        const newEvents = [
          ...events.slice(0, index),
          ...[current],
          ...events.slice(index + 1),
        ];
        console.log(newEvents);
        return [...newEvents];
      }

      return [...events, calendarEvent];
    });
    isEdit = false;
    editEvent.set(undefined);
    calendarEvent = { ...defaultCalendarEvent };
    showModal = false;
    modalClosed();
  };
  $: if ($editEvent) {
    calendarEvent.title = editEvent.title;
    calendarEvent.startDate = editEvent.start;
    calendarEvent.endDate = editEvent.endDate;
    calendarEvent.description = editEvent.extendedProperties?.description;
    const start = new Date(editEvent.start);
    const end = new Date(editEvent.end);
    startHour = getHours(start.getHours());
    startMinute = start.getMinutes();
    endHour = getHours(end.getHours());
    endMinute = end.getMinutes();
    startAmPm = start.getHours() >= 12 ? "PM" : "AM";
    endAmPm = end.getHours() >= 12 ? "PM" : "AM";
  }
  const setDates = (start, end) => {
    if (new Date(start).getTime() > new Date(end).getTime()) {
      endDate = start;
    }
  };
  $: calendarEvent.startDate = startDate;
  $: calendarEvent.endDate = endDate;
  $: formattedStartDate = Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(startDate);
  $: setDates(startDate, endDate);
  $: formattedEndDate = Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(endDate);

  const titleChanged = (event) => {
    title = event.target.value;
    calendarEvent.title = event.target.value;
  };
  const descriptionChanged = (event) => {
    description = event.target.value;
    calendarEvent.description = event.target.value;
  };
  onDestroy(() => {
    console.log("Destroying");
  });
  onMount(() => {
    console.log("edit event", $editEvent);
    if ($editEvent) {
      isEdit = true;
      calendarEvent.id = $editEvent.id;
      modalTitle = "Edit Calendar Event";
      title = $editEvent.title;
      description = $editEvent.extendedProperties?.description;
      startDate = $editEvent.start;
      endDate = $editEvent.end;
      const start = new Date($editEvent.start);
      const end = new Date($editEvent.end);
      startHour = getHours(start.getHours()).toString();
      startMinute = start.getMinutes().toString();
      endHour = getHours(end.getHours()).toString();
      endMinute = end.getMinutes().toString();
      startAmPm = start.getHours() >= 12 ? "PM" : "AM";
      endAmPm = end.getHours() >= 12 ? "PM" : "AM";
      editEvent.set(undefined);
    }
  });
</script>

{#if showModal}
  <Modal title={modalTitle} {onClose}>

    <div slot="body">
      <div class="w-full md:w-1/2 mb-6 md:mb-0">
        <Text
          label="Title"
          classes="calInput"
          value={title}
          onChange={titleChanged}
          id="calTitle"
          placeholder="Title" />
      </div>
      <div class="w-full md:w-1/2 mb-6 md:mb-0">
        <Text
          label="description"
          classes="calInput"
          value={description}
          onChange={descriptionChanged}
          id="calDescription"
          placeholder="Description" />
      </div>

      <div class="flex w-full">
        <div>
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2">
            Start Date/Time
          </label>
          <div class="border-gray-300 flex mr-4">
            <DatePicker bind:selected={startDate}>
              <div>
                <div class="calInput mr-4" tabindex={0}>
                  {formattedStartDate}
                </div>
                <div />

              </div>
            </DatePicker>
            <div class="flex ml-4 calInput">
              <select
                name="hours"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0"
                bind:value={startHour}>
                {#each hours as hour}
                  <option value={hour}>{hour}</option>
                {/each}
              </select>
              <span class="mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0
                mr-4"
                bind:value={startMinute}>
                {#each minutes as minute}
                  <option value={minute}>{minute}</option>
                {/each}
              </select>
              <select
                name="ampm"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0"
                value={startAmPm}>
                {#each ampm as value}
                  <option {value}>{value}</option>
                {/each}
              </select>
            </div>

          </div>
        </div>

      </div>
      <div class="flex w-full">
        <div>
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2">
            End Date/Time
          </label>
          <div class="border-gray-300 flex mr-4">
            <DatePicker bind:selected={endDate}>
              <div>
                <div class="calInput mr-4" tabindex={0}>{formattedEndDate}</div>
                <div />

              </div>
            </DatePicker>
            <div class="flex ml-4 calInput">
              <select
                name="hours"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0"
                bind:value={endHour}>
                {#each hours as hour}
                  <option value={hour}>{hour}</option>
                {/each}
              </select>
              <span class="mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0
                mr-4"
                bind:value={endMinute}>
                {#each minutes as minute}
                  <option value={minute}>{minute}</option>
                {/each}
              </select>
              <select
                name="ampm"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0"
                bind:value={endAmPm}>
                {#each ampm as value}
                  <option {value}>{value}</option>
                {/each}
              </select>
            </div>

          </div>
        </div>

      </div>
    </div>

    <div slot="actions" class="w-full flex justify-end">
      <OutlineButton
        label="Cancel"
        onClick={onClose}
        color="red"
        classes="mr-4" />
      <OutlineButton label="Save" onClick={saveEvent} color="blue" />

    </div>

  </Modal>
{/if}
