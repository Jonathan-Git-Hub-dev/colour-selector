import Modal from './Modal.js';
import {useRef, useState} from 'react';
import '../CSS/ColourSelect.css';
import Slider from './Slider.js';

export default function ColourSelect()
{
    const childRef = useRef(null);
    
    
    const [black, setBlack] = useState(0);
    const [white, setWhite] = useState(0);
    const colour = useRef([2550,0,0]);

    //output user's colour to preview window
    function displayColour(Colour, Black, White)
    {
        let r = (Colour[0] + (White * (255 - Colour[0]))) * Black;
        let g = (Colour[1] + (White * (255 - Colour[1]))) * Black;
        let b = (Colour[2] + (White * (255 - Colour[2]))) * Black;
    
        //console.log(`r ${r}, g ${g}, b ${b}`);
    
        let preview = document.getElementById("preview");
        preview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;  
    }
    
    //change colour selector knob and black and white spectrum
    function colourInputs(Colour)
    {
        const rgbColour = `rgb(${Colour[0]}, ${Colour[1]}, ${Colour[2]})`;
        let blackRange = `linear-gradient(90deg, ${rgbColour}, black)`;
        let whiteRange = `linear-gradient(90deg, ${rgbColour}, white)`;
    
        document.getElementById("myRange").style.backgroundImage= blackRange;
        document.getElementById("myRange2").style.backgroundImage= whiteRange;
    }
    
    //calculate user's colour choice
    /*function cl(val)
    {
        let maxV= 201;
        let cmb = [[255,0,0],[255,255,0],[0, 255, 0],[0,255,255], [0, 0, 255], [255,0,255],[255,0,0]];
        let lens = cmb.length -1;
        let gaps = Math.ceil(maxV/lens);
        let index = Math.floor((val-1)/gaps);
        let mix = val/gaps - index;

        let a = cmb[index][0] * (1-mix) + cmb[index+1][0] * mix;
        let b = cmb[index][1] * (1-mix) + cmb[index+1][1] * mix;
        let c = cmb[index][2] * (1-mix) + cmb[index+1][2] * mix;
    
        colour.current=[a,b,c];
        return [a,b,c];
    }*/
    
    /*function moveKnob(e)
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
    }*/
    
    /*function getSlideVal()
    {
        let s = document.getElementById('s');
        let k = document.getElementById('k');
        let space = s.clientWidth - k.clientWidth;

        let step = space/options;

        return Math.floor(k.offsetLeft/step) + 1;
    }*/

    function handleBlack(e)
    {
        setBlack(e.target.value);
        displayColour(colour.current, (100-e.target.value)/100, white/100);
    }

    function handleWhite(e)
    {
        setWhite(e.target.value);
        displayColour(colour.current, (100-black)/100, e.target.value/100);  
    }

    function handleColour(tempColour)
    {
        colour.current = tempColour;
        displayColour(tempColour, (100-black)/100, white/100);
        colourInputs(tempColour);
    }

    


    return(
        <Modal passedRef={childRef} func={()=>{console.log("all g")}} buttonText="hello">
            <div className="colourSelectFrame">
                <div className="colourSelectHolder">
                    <input type="range" min="0" max="100" value={black} className="slider" id="myRange" onChange={handleBlack} />
                    <div className="out" id="preview" />
                    <input type="range" min="0" max="100" value={white} className="sliderb" id="myRange2" onChange={handleWhite}/>
                </div>

                <Slider displayFunc={handleColour} /> 

                <div className="ttt" />
            </div>
        </Modal>
    );
}