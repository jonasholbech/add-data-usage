<script>
    import { tweened } from 'svelte/motion'
  import { linear } from 'svelte/easing'
  import { derived } from 'svelte/store'
  import { raw, parsed, highestRequests, highestSize, totalTimeRun } from "./data";
  import Bar from "./Bar.svelte";
  let index=0;
  let running=false;

  function increment(){
    index=index+10
    if(index>=raw.length*10){
      index=0;
    }
  }
  
  function tick(){
    if(running){
      increment();
      setTimeout(tick, 1500)
    }
  }

  function play(){
    running=!running;
    tick()
  }

  function reset(){
    running=false;
    index=0;
  }
</script>

<main>
  <button on:click={play}>{running ? "Pause":"Play"}</button>
  <button on:click={reset}>Reset</button>
  <h1>{index} sekunder</h1>
  <div id="graph">
    <div class="browser">
      <h2>No adds</h2>
      <Bar value={parsed[index].noadds.requests} label="requests" percent={parsed[index].noadds.requests / highestRequests*100} />
      <Bar value={parsed[index].noadds.transferred} label="transferred" percent={parsed[index].noadds.transferred / highestSize*100} />
    </div>
    <div class="browser">
      <h2>With adds</h2>
      <Bar value={parsed[index].adds.requests} label="requests" percent={parsed[index].adds.requests / highestRequests*100} />
      <Bar value={parsed[index].adds.transferred} label="transferred" percent={parsed[index].adds.transferred / highestSize*100} />
    </div>
  </div>
</main>

<style>
  #graph, .browser {
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:1rem;
  }
  #graph {
    gap:3rem;
  }
  h2 {
    grid-column: 1/-1;
    text-align:center;
  }
  h1 {
    text-align:center;
    font-size:3rem;
  }
  button {
    padding:1rem;
    border: 1px solid #eee;
    border-radius: 8px;
    font-size: 1.4rem;
  }
</style>
