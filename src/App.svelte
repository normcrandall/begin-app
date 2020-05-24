<script>
  import Tailwindcss from "./Tailwind.svelte";
  import { onMount } from "svelte";
  export let name;
  export let message;

  onMount(async () => {
    let data = await (await fetch("/api")).json();
    message = data.msg;
    console.log("MESSAGE: ", message);
  });
</script>

<main class="bg-green-500">
  <h1 class="">Test 5 {name}!</h1>
  <h2>{message}</h2>
  <h3>Change me d!</h3>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>
