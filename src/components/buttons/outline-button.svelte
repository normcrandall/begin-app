<script lang="typescript">
  import classNames from "classnames";
  export let color: "red" | "blue" | "green";
  export let disabled: boolean;
  export let onClick: () => void;
  export let classes: string | undefined;
  export let type: "button" | "submit";
  export let label: string;
  const buttonClass = classNames({
    "bg-transparent font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded": true,

    "text-red-600 hover:bg-red-700": color === "red",
    "text-blue-600 hover:bg-blue-700": color === "blue",
    "text-green-600 hover:bg-green-700": color === "green",

    "cursor-not-allowed opacity-50": disabled,
  });
</script>

<button
  class={`${buttonClass} ${classes}`}
  {type}
  {disabled}
  on:click={onClick}>
  {label}
</button>
