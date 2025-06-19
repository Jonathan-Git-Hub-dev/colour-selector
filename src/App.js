
import './App.css';
import {useState} from 'react';

function App() {
  const [val, setVal] = useState(50);
  const [hue, setHue] = useState([255,165,0]);
  return (
    <div className="App" style={{backgroundColor: "rgb(" + String(hue[0]) + "," + String(hue[1]) + "," + String(hue[2]) +")"}}>
      <p>hello</p>
      {/*<div className="appG"></div>*/}
      <input type="range" min="1" max="1000" value={val} onChange={(e)=>{
        setVal(e.target.value)

        let maxV= 1000;
          let minV = 1;

          let cols = ['red', 'yellow', 'limegreen', 'dodgerblue', 'purple', 'red'];
          let cmb = [[255,0,0],[255,255,0],[50, 205, 50], [30, 144, 255], [255,0,255],[255,0,0]]
          let lens = cols.length -1;
          //console.log(lens);
          //coso
          let gaps = Math.ceil(maxV/lens);
          let index = Math.floor((e.target.value-1)/gaps);
          
          console.log(index);

          let mix = e.target.value/gaps - index;

          //console.log(cols[index] + " %= " + (1-mix))
          //console.log(cols[index+1] + " %= " +mix)

          let a = cmb[index][0] * (1-mix) + cmb[index+1][0] * mix;
          let b = cmb[index][1] * (1-mix) + cmb[index+1][1] * mix;
          let c = cmb[index][2] * (1-mix) + cmb[index+1][2] * mix;

          //console.log("(" + a + "," + b + "," + c + ")");

          setHue([a,b,c]);
      }}class="slider" id="myRange"></input>
      {/*<button
        onClick={()=>{
          //console.log(val);
          let maxV= 1000;
          let minV = 1;

          let cols = ['red', 'yellow', 'limegreen', 'dodgerblue', 'purple', 'red'];
          let cmb = [[255,0,0],[255,255,0],[50, 205, 50], [30, 144, 255], [255,0,255],[255,0,0]]
          let lens = cols.length -1;
          //console.log(lens);
          //coso
          let gaps = maxV/lens;
          let index = Math.floor(val/gaps);
          let mix = val/gaps - index;

          console.log(cols[index] + " %= " + (1-mix))
          console.log(cols[index+1] + " %= " +mix)

          let a = cmb[index][0] * (1-mix) + cmb[index+1][0] * mix;
          let b = cmb[index][1] * (1-mix) + cmb[index+1][1] * mix;
          let c = cmb[index][2] * (1-mix) + cmb[index+1][2] * mix;

          console.log("(" + a + "," + b + "," + c + ")");

          setHue([a,b,c]);
          
        }}
      >calc</button>*/}
    {/*<div className="res" style={{backgroundColor: "rgb(" + String(hue[0]) + "," + String(hue[1]) + "," + String(hue[2]) +")"}}></div>*/}
    </div>
  );
}

export default App;
//<div className="res" style={{backgroundColor: "rgb(`${hue[0]}`,2,3)"}}></div>