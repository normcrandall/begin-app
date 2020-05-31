<script lang="typescript">
  export let onClose: () => void;
  export let title: string;
</script>

<div
  class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full
  bg-opacity-50 bg-gray-800 z-10">
  <div class="bg-white rounded-lg sm:w-full md:w-1/2 w-1/2">
    <div class="flex flex-col items-start">
      <div class="flex items-center w-full border-b-2 border-gray-200 p-4">
        <div class="text-gray-900 font-medium text-lg">{title}</div>
        <svg
          class="ml-auto fill-current text-gray-500 w-6 h-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          on:click={onClose}>
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47
            4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
        </svg>
      </div>
      <div class="p-4 w-full">
        <slot name="body" class="p-4" />
      </div>
      <div class="p-4 w-full">
        <slot name="actions" class="flex justify-end" />
      </div>
    </div>
  </div>
</div>
