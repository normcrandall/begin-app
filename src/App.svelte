<script lang="typescript">
  import Tailwindcss from "./Tailwindcss.svelte";
  import { user } from "./store/user";
  import { auth } from "./helpers/firebase.js";
  import { Router, Link, Route } from "svelte-navigator";
  import Calendar from "./pages/calendar.svelte";
  import Login from "./components/auth/login.svelte";
  import Register from "./components/auth/register.svelte";
  let currentUser;
  //const currentUser: any = auth().currentUser;

  export let url = "";
</script>

<Tailwindcss />
<main>
  <Router>
    <div>
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="calendar" component={Calendar} />
    </div>
  </Router>
</main>
