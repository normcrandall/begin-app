<script lang="typescript">
  import Tailwindcss from "./Tailwindcss.svelte";
  import { user, setAuth, signout } from "./store/user.ts";

  import { Router, Link, Route, navigate } from "svelte-routing";
  import Calendar from "./pages/calendar.svelte";
  import Login from "./components/auth/login.svelte";
  import Register from "./components/auth/register.svelte";
  import { client } from "./data/index";
  import Spinner from "./components/spinner.svelte";
  import OutlineButton from "./components/buttons/outline-button.svelte";
  setAuth();
  $: $user.loggedIn && !$user.loggingIn
    ? navigate("/calendar")
    : navigate("/login");

  const logout = () => {
    signout();
  };
</script>

<Tailwindcss />

<main>

  <div class="w-full h-full">
    {#if $user.loggingIn}
      <div class="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    {:else}
      <div>
        <OutlineButton onClick={logout} />
        <Router>
          <Route path="login" component={Login} />
          <Route path="register" component={Register} />
          <Route path="calendar" component={Calendar} />
        </Router>
      </div>
    {/if}

  </div>

</main>
