<script lang="typescript">
  import { defaultCalendarEvent as calendarEvent } from "../store/calende-event";
  import Button from "../buttons/small-fab.svelte";
  import Modal from "../modal/modal.svelte";
  import Text from "../inputs/text.svelte";

  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutes = ["00", "15", "30", "45"];
  const ampm = ["AM", " PM"];
  let showModal = false;
  let startTime;
  const setShowModal = () => {
    showModal = true;
  };
  const onClose = () => {
    showModal = false;
  };
</script>

{#if showModal}
  <Modal title="Add New Event" {onClose}>

    <div slot="body">
      <div class="w-full md:w-1/2 mb-6 md:mb-0">
        <Text
          label="Title"
          classes="calInput"
          value={calendarEvent.title}
          id="calTitle"
          placeholder="Title" />

      </div>
      <div class="w-full md:w-1/2 mb-6 md:mb-0">
        <Text
          label="description"
          classes="calInput"
          value={calendarEvent.description}
          id="calDescription"
          placeholder="Description" />
      </div>

      <div class="flex w-full items-start">
        <div>
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2">
            Start Time
          </label>
          <div class="border-2 border-gray-300 calInput mr-4 px-3 w-40 mr-4">

            <div class="flex">
              <select
                name="hours"
                class="bg-transparent text-xl appearance-none outline-none
                border-0">
                {#each hours as hour}
                  <option value={hour}>{hour}</option>
                {/each}
              </select>
              <span class="text-xl mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent text-xl appearance-none outline-none mr-4
                border-0">
                {#each minutes as minute}
                  <option value={minute}>{minute}</option>
                {/each}
              </select>
              <select
                name="ampm"
                class="bg-transparent text-xl appearance-none outline-none
                border-0">
                {#each ampm as value}
                  <option {value}>{value}</option>
                {/each}
              </select>
            </div>

          </div>
        </div>
        <div>
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2">
            End Time
          </label>
          <div class="border-2 border-gray-300 calInput mr-4 px-3 w-40 mr-4">

            <div class="flex">
              <select
                name="hours"
                class="bg-transparent text-xl appearance-none outline-none
                border-0">
                {#each hours as hour}
                  <option value={hour}>{hour}</option>
                {/each}
              </select>
              <span class="text-xl mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent text-xl appearance-none outline-none mr-4
                border-0">
                {#each minutes as minute}
                  <option value={minute}>{minute}</option>
                {/each}
              </select>
              <select
                name="ampm"
                class="bg-transparent text-xl appearance-none outline-none
                border-0">
                {#each ampm as value}
                  <option {value}>{value}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div slot="actions">
      <button>Ok</button>
    </div>

  </Modal>
{/if}
<form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">

    <Button
      type="button"
      size="small"
      color="blue"
      classes="fixed bottom-0 right-0 mb-10 mr-10 z-10"
      title="Add Event"
      onClick={setShowModal} />
  </div>

</form>

<!-- 

<div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-password">
        Password
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border
        border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
        focus:bg-white focus:border-gray-500"
        id="grid-password"
        type="password"
        placeholder="******************" />
      <p class="text-gray-600 text-xs italic">
        Make it as long and as crazy as you'd like
      </p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-city">
        City
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border
        border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
        focus:bg-white focus:border-gray-500"
        id="grid-city"
        type="text"
        placeholder="Albuquerque" />
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-state">
        State
      </label>
      <div class="relative">
        <select
          class="block appearance-none w-full bg-gray-200 border border-gray-200
          text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none
          focus:bg-white focus:border-gray-500"
          id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex
          items-center px-2 text-gray-700">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757
              6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="grid-zip">
        Zip
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border
        border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
        focus:bg-white focus:border-gray-500"
        id="grid-zip"
        type="text"
        placeholder="90210" />
    </div> -->
