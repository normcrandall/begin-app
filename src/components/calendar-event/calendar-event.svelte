<script lang="typescript">
  import { onMount, onDestroy } from "svelte";

  import Button from "../buttons/small-fab.svelte";
  import Modal from "../modal/modal.svelte";
  import Text from "../inputs/text.svelte";
  import OutlineButton from "../buttons/outline-button.svelte";
  import DatePicker from "../datepicker/Datepicker.svelte";
  import { editEvent, clear, saveEvent } from "../../store/edit-event.ts";

  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutes = ["00", "15", "30", "45"];
  const ampm = ["AM", "PM"];

  export let showModal: boolean = false;

  export let modalClosed: () => void;
  let isEdit = false;

  let modalTitle = "Add Calendar Event";

  const getHours = (hours) => {
    return hours > 12 ? 12 - hours : hours;
  };
  let formattedEndDate: string;
  let formattedStartDate: string;

  const setShowModal = () => {
    {
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
    if (time.includes("am") && hours === 12) hours -= 12;
    console.log("hours", hours);
    return 1000 /*ms*/ * 60 /*s*/ * (hours * 60 + minutes);
  };
  const save = () => {
    saveEvent();
    isEdit = false;
    clear();

    showModal = false;
    modalClosed();
  };

  $: formattedStartDate = Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format($editEvent.start);

  $: formattedEndDate = Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format($editEvent.end);

  const titleChanged = (event) => {
    $editEvent.title = event.target.value;
  };
  const descriptionChanged = (event) => {
    $editEvent.description = event.target.value;
  };

  onMount(() => {
    console.log("edit event", $editEvent);
    if ($editEvent.id !== 0) {
      modalTitle = "Edit Calendar Event";
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
          value={$editEvent.title}
          onChange={titleChanged}
          id="calTitle"
          placeholder="Title" />
      </div>
      <div class="w-full md:w-1/2 mb-6 md:mb-0">
        <Text
          label="description"
          classes="calInput"
          value={$editEvent.description}
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
            <DatePicker bind:selected={$editEvent.start}>
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
                bind:value={$editEvent.startHour}>
                {#each hours as hour}
                  <option value={hour}>{hour}</option>
                {/each}
              </select>
              <span class="mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0
                mr-4"
                bind:value={$editEvent.startMinute}>
                {#each minutes as minute}
                  <option value={minute}>{minute}</option>
                {/each}
              </select>
              <select
                name="ampm"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0"
                value={$editEvent.startAmPm}>
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
            <DatePicker bind:selected={$editEvent.end}>
              <div>
                <div class="calInput mr-4" tabindex={0}>{formattedEndDate}</div>
                <div />

              </div>
            </DatePicker>
            <div class="flex ml-4 calInput">
              <select
                name="hours"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0"
                bind:value={$editEvent.endHour}>
                {#each hours as hour}
                  <option value={hour}>{hour}</option>
                {/each}
              </select>
              <span class="mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0
                mr-4"
                bind:value={$editEvent.endMinute}>
                {#each minutes as minute}
                  <option value={minute}>{minute}</option>
                {/each}
              </select>
              <select
                name="ampm"
                class="bg-transparent appearance-none hover:bg-gray-100 border-0"
                bind:value={$editEvent.endAmPm}>
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
      <OutlineButton label="Save" onClick={save} color="blue" />

    </div>

  </Modal>
{/if}
