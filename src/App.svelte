<script>
    import { tweened } from 'svelte/motion'
  import { linear } from 'svelte/easing'
  import { derived } from 'svelte/store'
  
  const totalTimeRun = 20*10//Sekunder
  const raw = [
    [0,0,0,0],
    [20, 1.22, 122, 6.2],
    [20, 1.22, 243, 9.7],
    [71, 4.11, 244, 9.8],
    [71, 4.11, 244, 9.8],
    [71, 4.11, 252, 10.0],
    [72, 4.25, 253, 10.0],
    [72, 4.25, 269, 10.3],
    [72, 4.25, 270, 10.3],
    [72, 4.25, 286, 10.7],
    [72, 4.25, 287, 10.7],
    [72, 4.25, 325, 11.5],
    [72, 4.25, 329, 11.5],
    [72, 4.25, 367, 12.4],
    [72, 4.25, 371, 12.4],
    [72, 4.25, 409, 13.2],
    [72, 4.25, 413, 13.2],
    [72, 4.25, 451, 14.1],
    [72, 4.25, 476, 14.6],
    [72, 4.25, 481, 14.6],
  ]
  const parsed = {}
  const highestRequests=raw.at(-1)[2];
  const highestSize=raw.at(-1)[3];
  console.log(highestRequests, highestSize, raw.length)
  raw.forEach((row, index)=>{
    const [r1,s1,r2,s2]=row;
    
    parsed[index*10] = {
      noadds: {
        requests:r1,
        transferred: s1
      },
      adds: {
        requests:r2,
        transferred: s2
      }
    }
  })
  
  let index=0;

  let r1 = tweened(0, { duration: 900, easing: linear })
  let r2 = tweened(0, { duration: 900, easing: linear })
  let s1 = tweened(0, { duration: 900, easing: linear })
  let s2 = tweened(0, { duration: 900, easing: linear })

  let formattedR1 = derived(r1, ($myNumber) => $myNumber.toFixed())
  let formattedR2 = derived(r2, ($myNumber) => $myNumber.toFixed())
  let formattedS1 = derived(s1, ($myNumber) => $myNumber.toFixed(2))
  let formattedS2 = derived(s2, ($myNumber) => $myNumber.toFixed(2))
  function increment(){
    index=index+10
    if(index>=raw.length*10){
      index=0;
    }
    r1.set(parsed[index].noadds.requests)
    r2.set(parsed[index].adds.requests)
    s1.set(parsed[index].noadds.transferred)
    s2.set(parsed[index].adds.transferred)
  }
  let running=false;
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
    r1.set(0)
    r2.set(0)
    s1.set(0)
    s2.set(0)
  }
</script>

<main>
  <button on:click={play}>{running ? "Pause":"Play"}</button>
  <button on:click={reset}>Reset</button>
  <h1>{index} sekunder</h1>
  <div id="graph">
    <div class="browser">
      <h2>No adds</h2>
      <div class="column">
        <h3>Requests: <strong>{$formattedR1}</strong></h3>
        <div class="bar" style={`--height:${parsed[index].noadds.requests / highestRequests*100}%`}></div>
      </div>
      <div class="column">
        <h3>Transferred: <strong>{$formattedS1}mb</strong></h3>
        <div class="bar" style={`--height:${parsed[index].noadds.transferred / highestSize*100}%`}></div>
      </div>
    </div>
    <div class="browser">
      <h2>No adds</h2>
      <div class="column">
        <h3>Requests: <strong>{$formattedR2}</strong></h3>
        <div class="bar" style={`--height:${parsed[index].adds.requests / highestRequests*100}%`}></div>
      </div>
      <div class="column">
        <h3>Transferred: <strong>{$formattedS2}mb</strong></h3>
        <div class="bar" style={`--height:${parsed[index].adds.transferred / highestSize*100}%`}></div>
      </div>
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
    height: var(--height);/*calc(var(--height) + 0px);*/
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
