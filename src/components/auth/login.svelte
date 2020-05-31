<script lang="typescript">
  import { auth, provider } from "../../helpers/firebase.js";
  import { navigate } from "svelte-routing";
  import { user } from "../../store/user";
  import OutlineButton from "../buttons/outline-button.svelte";

  let email = "";
  let password = "";

  const handleGoogleLogin = () => {
    auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var firebaseuser = result.user;

        if (firebaseuser) {
          let { email, uid } = firebaseuser;
          console.log("Google first", $user);
          user.set({ ...$user, loggedIn: true, userId: uid });
          console.log("Google then", $user);
        }
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  // Destructuring to obtain email and password from form via Event
  const handleLoginForm = async () => {
    try {
      await auth().setPersistence("local");

      const result = await auth().signInWithEmailAndPassword(email, password);

      let firebaseUser = auth().currentUser;

      if (firebaseUser) {
        let { email, uid } = firebaseUser;
        console.log("first", $user);
        user.set({ ...$user, loggedIn: true, userId: uid });
        console.log("then", $user);

        navigate("/calendar");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = () => {
    navigate("/register");
  };
</script>

<div class="align-middle fixed flex h-full justify-center left-0 top-0 w-full">
  <div class="self-center sm:w-full w-1/2">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="username">
          Email
        </label>
        <input
          bind:value={email}
          class="shadow appearance-none border rounded w-full py-2 px-3
          text-grey-darker"
          id="username"
          type="text"
          placeholder="Username" />
      </div>
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password">
          Password
        </label>
        <input
          bind:value={password}
          class="shadow appearance-none border border-red rounded w-full py-2
          px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************" />

      </div>
      <div class="flex items-center justify-between">
        <OutlineButton
          color="green"
          type="button"
          label="Sign In"
          onClick={handleLoginForm} />
        <OutlineButton
          color="blue"
          type="button"
          label="Register"
          onClick={handleRegister} />
        <a
          class="inline-block align-baseline font-bold text-sm text-blue
          hover:text-blue-darker"
          href="#">
          Forgot Password?
        </a>
      </div>
    </div>
  </div>
</div>
