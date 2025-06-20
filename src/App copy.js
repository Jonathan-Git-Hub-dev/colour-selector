
import './App.css';
import {useState, useRef} from 'react';

function App() {
  const down = useRef(false);
  const [val, setVal] = useState(50);
  //const [hue, setHue] = useState([0,0,0]);
  function cl(e)
  {
        setVal(e.target.value)

        let maxV= 1000;
          let minV = 1;

          //let cols = ['red', 'yellow', 'limegreen', 'dodgerblue', 'purple', 'red'];
          let cmb = [[255,0,0],[255,255,0],[0, 255, 0], [0, 0, 255], [255,0,255],[255,0,0]]
          //let cmb = [[255,0,0],[255,255,0],[50, 205, 50], [30, 144, 255], [255,0,255],[255,0,0]]
          //let lens = cols.length -1;
          let lens = 5;
          //console.log(lens);
          //coso
          let gaps = Math.ceil(maxV/lens);
          let index = Math.floor((e.target.value-1)/gaps);
          
          //console.log(index);

          let mix = e.target.value/gaps - index;

          //console.log(cols[index] + " %= " + (1-mix))
          //console.log(cols[index+1] + " %= " +mix)

          let a = cmb[index][0] * (1-mix) + cmb[index+1][0] * mix;
          let b = cmb[index][1] * (1-mix) + cmb[index+1][1] * mix;
          let c = cmb[index][2] * (1-mix) + cmb[index+1][2] * mix;

          //console.log("(" + a + "," + b + "," + c + ")");

          //setHue([a,b,c]);
          //let ttt = document.getElementById("out");
          //const rgbColor = `rgb(${a}, ${b}, ${c})`;
          //ttt.style.backgroundColor = rgbColor;
          let n = document.getElementById("myRange");
          //console.log(n);
          console.log(n.style);
          //n.style.MozRa = '5px 5px 10px rgba(0, 0, 0, 0.3)';
        }

  return (
    <div className="App">
      <div className="out" id="out"></div>
      
      <input type="range" min="1" max="1000" value={val} onChange={cl} className="slider" id="myRange"></input>
      
      
      <div onMouseMove={(e)=>{
            //console.log("helo");

            //always 
            if(down.current == true)
            {
              //console.log("doing");
              let s = document.getElementById('s');

              //console.log(s.offsetLeft);
              //console.log(s.clientWidth)
              //console.log(e.clientX)
              
              /*if(move > s.clientWidth)
              {
                move = s.clientWidth;
              }
              if(move )*/
              let k = document.getElementById('k');
              let h = document.getElementById('h');

              //let soff = s.offsetLeft;
              let hoff = h.offsetLeft;
              //let soffh = s.offsetHeight;
              //let hoffh = h.offsetHeight;
              //console.log("X: " + (e.clientX - hoff ));
              //k.style.top = "3px";
              let ex = (h.clientWidth - s.clientWidth)/2;
              //console.log(ex);
              let move = (e.clientX - hoff);
              if(move >= 0 && move <= ex)
              {
                move = 0;
              }
              else if(move >= s.clientWidth + ex)
              {
                move = s.clientWidth;
              }
              else
              {
                move -=ex;
              }
              /*if(move < ex)
              {
                move=0;
              }
              elseif(move > s.clientWidth+ ex)
              {
                move=s.clientWidth;
              }*/
              console.log(move);
              k.style.left = move + "px";
            }
            /*else
            {
              console.log("not");
            }*/
          }}
          onMouseUp={()=>{
            //console.log("upp")
            down.current = false;
          }}
          onMouseLeave={()=>{
            //console.log("upp")
            down.current = false;
          }}id="h" className="h">
        <div id="s" className="s">
          <div id="k" className="k"
            onMouseDown={()=>{
              down.current = true;
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
//<div className="res" style={{backgroundColor: "rgb(`${hue[0]}`,2,3)"}}></div>

/*<button
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
      >calc</button>*/

/*
<div className="hold">
      <div id="i1" className="temp"></div>
      <div id="i2" className="temp"></div>
      <div id="i3" className="temp"></div>
      <div id="i4" className="temp"></div>
      <div id="i5" className="temp"></div>
      <div id="i6" className="temp"></div>
      <div id="i7" className="temp"></div>
      <div id="i8" className="temp"></div>
      <div id="i9" className="temp"></div>
      <div id="i10" className="temp"></div></div>
*/
/*<div className="res" style={{backgroundColor: "rgb(" + String(hue[0]) + "," + String(hue[1]) + "," + String(hue[2]) +")"}}></div>*/

/*<div className="appG"></div>*/

/*<div className="App" style={{backgroundColor: "rgb(" + String(hue[0]) + "," + String(hue[1]) + "," + String(hue[2]) +")"}}>*/

/*<div className="h" onMouseDown={(e)=>{
        e.preventDefault();
        console.log("dwon");
      }}
      onMouseUp={(e)=>{
        e.preventDefault();
        console.log("up");
      }}>here</div>*/