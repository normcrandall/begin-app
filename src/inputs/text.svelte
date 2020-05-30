<script lang="typescript">
  export let value: string;
  export let label: string;
  export let placeholder: string;
  export let id: string;
  export let classes: string;
</script>

<label
  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  for={id}>
  {label}
</label>
<input class={`${classes}`} {id} type="text" bind:value {placeholder} />
