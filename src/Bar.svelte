<script>
  import { tweened } from 'svelte/motion'
  import { linear } from 'svelte/easing'
  import { derived } from 'svelte/store'
  export let value=0;
  export let label;
  /* export let type="requests"; */
  export let percent;

  let r1 = tweened(0, { duration: 900, easing: linear })
  $: r1.set(value)
  let formatted = derived(r1, ($myNumber) => $myNumber.toFixed(label=== "requests"? 0 : 2))

  //<Bar value={parsed[index].noadds.requests} label={requests} type="size" percent={parsed[index].noadds.requests / highestRequests*100} />
</script>

<div class="column">
    <h3><strong>{$formatted}
    {#if label==="transferred"}
    mb
    {/if}
    </strong> {label}</h3>
    <div class="bar" style={`--height:${percent}`}></div>
  </div>

<style>
    h3 {
    padding-inline-start:1rem;
    color:#ccc;
    
  }
  h3 strong {
      color:#eee;
    }
  .column {
    display: flex;
    flex-direction: column;
    min-height:400px;
    border: 1px solid #eee;
  }
  .bar {
    transition: height 1s linear;
    background:hotpink;
    margin-top:auto;
    min-height:5px;
    height: calc(var(--height) * 1%);
  }
</style>