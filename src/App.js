
import './App.css';
import {useState, useRef} from 'react';

function App() {
  const down = useRef(false);
  const [black, setBlack] = useState(0);
  const [white, setWhite] = useState(0);
  const colour = useRef([2550,0,0]);
  //const [val, setVal] = useState(50);
  let options = 200;
  //const [hue, setHue] = useState([0,0,0]);
  //function()
  function displayColour(Colour, Black, White)
  {
    //black then white
    let r = Colour[0]// * Black; 
    r+= (White * 255);
    let g = Colour[1]// * Black;
    g+= (White * 255);
    let b = Colour[2]// * Black;
    b+= (White * 255);


    //console.log(Black)
    //console.log(r + ' ' + g + ' ' + b);



    let ttt = document.getElementById("out");
    const rgbColour = `rgb(${r}, ${g}, ${b})`;
    ttt.style.backgroundColor = rgbColour;  
  }

  function colourKnob(Colour)
  {
    const rgbColour = `rgb(${Colour[0]}, ${Colour[1]}, ${Colour[2]})`;

          document.getElementById("k").style.backgroundColor = rgbColour;
  }

  function cl(val)
  {
    let maxV= 201;

          //let cols = ['red', 'yellow', 'limegreen', 'dodgerblue', 'purple', 'red'];
          let cmb = [[255,0,0],[255,255,0],[0, 255, 0], [0, 0, 255], [255,0,255],[255,0,0]]
          //let cmb = [[255,0,0],[255,255,0],[50, 205, 50], [30, 144, 255], [255,0,255],[255,0,0]]
          //let lens = cols.length -1;
          let lens = 5;
          //console.log(lens);
          //coso
          let gaps = Math.ceil(maxV/lens);
          let index = Math.floor((val-1)/gaps);
          
          //console.log(index);

          let mix = val/gaps - index;

          //console.log(cols[index] + " %= " + (1-mix))
          //console.log(cols[index+1] + " %= " +mix)

          let a = cmb[index][0] * (1-mix) + cmb[index+1][0] * mix;
          let b = cmb[index][1] * (1-mix) + cmb[index+1][1] * mix;
          let c = cmb[index][2] * (1-mix) + cmb[index+1][2] * mix;

          //console.log("(" + a + "," + b + "," + c + ")");
          colour.current=[a,b,c];
          return [a,b,c];
          //setHue([a,b,c]);
          /*let ttt = document.getElementById("out");
          const rgbColour = `rgb(${a}, ${b}, ${c})`;
          ttt.style.backgroundColor = rgbColour;

          document.getElementById("k").style.backgroundColor = rgbColour;
          //let n = document.getElementById("myRange");
          //console.log(n);
          //console.log(n.style);
          //n.style.MozRa = '5px 5px 10px rgba(0, 0, 0, 0.3)';

          //setting black slider
          const neI = `linear-gradient(90deg,${rgbColour},black)`;
          document.getElementById("myRange").style.backgroundImage = neI;*/

        }

  function moveKnob(e)
  {
  let s = document.getElementById('s');
              let k = document.getElementById('k');
              let h = document.getElementById('h');

              let hoff = h.offsetLeft;
              let ex = (h.clientWidth - (s.clientWidth - k.clientWidth))/2;
              let move = (e.clientX - hoff);
              if(move >= 0 && move <= ex)
              {
                move = 0;
              }
              else if(move >= (s.clientWidth - k.clientWidth) + ex)
              {
                move = (s.clientWidth - k.clientWidth);
              }
              else
              {
                move -=ex;
              }
              
              k.style.left = move+ "px"
            }

    function getSlideVal()
    {
      let s = document.getElementById('s');
      let k = document.getElementById('k');
      let space = s.clientWidth - k.clientWidth;
      //console.log("space: " + space);

      let step = space/options;

      //let progress = k.offsetLeft - s.offsetLeft;
      //console.log(k.offsetLeft);
      return Math.floor(k.offsetLeft/step) + 1;

    }

  return (
    <div className="App">
      <div className="out" id="out"></div>
      
      <input type="range" min="0" max="100" value={black} className="slider" id="myRange" onChange={(e)=>{
          setBlack(e.target.value);
          displayColour(colour.current, (100-e.target.value)/100, white/100);
          /*let colP = 100-e.target.value;
          //let blackP = e.target.value;

          let a = colour.current[0] * (colP/100); 
          let b = colour.current[1] * (colP/100);
          let c = colour.current[2] * (colP/100);

          let ttt = document.getElementById("out");
          const rgbColour = `rgb(${a}, ${b}, ${c})`;
          ttt.style.backgroundColor = rgbColour;*/



      }}/>
      <input type="range" min="0" max="100" value={white} className="sliderb" id="myRange2" onChange={(e)=>{
          setWhite(e.target.value);
          displayColour(colour.current, (100-black)/100, e.target.value/100);
          /*let whiteP = e.target.value/100;
          //let blackP = e.target.value;

          let a = colour.current[0] + (255*whiteP); 
          let b = colour.current[1] + (255*whiteP);
          let c = colour.current[2] + (255*whiteP);

          let ttt = document.getElementById("out");
          const rgbColour = `rgb(${a}, ${b}, ${c})`;
          ttt.style.backgroundColor = rgbColour;*/



      }}/>

      
            
      
      <div onMouseMove={(e)=>{
            //console.log("helo");

            //always 
            if(down.current == true)
            {
              moveKnob(e);
              let val = getSlideVal();
              let temp  = cl(val);
              displayColour(temp, (100-black)/100, white/100);
              colourKnob(temp);
              //get black and white
            }
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

/*<input type="range" min="1" max="1000" value={val} onChange={cl} className="slider" id="myRange"></input>
*/