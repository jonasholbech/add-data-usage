<script>
  import { tweened } from 'svelte/motion'
  import { linear } from 'svelte/easing'
  import { derived } from 'svelte/store'
  export let parsed;
  export let index;

  let r1 = tweened(index, { duration: 900, easing: linear })
  $: r1.set(parsed[index].noadds.requests)
  
  

  let formattedR1 = derived(r1, ($myNumber) => $myNumber.toFixed())
  
</script>

<div>{$formattedR1}</div>

