<script lang="typescript">
  import Tailwindcss from "./Tailwindcss.svelte";
  import { user } from "./store/user";
  import { auth } from "./helpers/firebase.js";
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Calendar from "./pages/calendar.svelte";
  import Login from "./components/auth/login.svelte";
  import Register from "./components/auth/register.svelte";
  import { client } from "./data/index";

  const users: any = auth().currentUser;
  console.log("users", users);
  if (users !== null) {
    user.update(() => ({ loggedIn: true, userId: users[0].id }));

    navigate("/calendar");
  } else {
    navigate("/login");
  }
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
