import {useRef, useState} from 'react';
import '../CSS/ColourSelect.css';
import Modal from './Modal.js';
import Slider from './Slider.js';

export default function ColourSelect(props)
{
    const childRef = useRef(null);//use to display modal
    
    //stores colour values from the input sliders
    const [black, setBlack] = useState(100);
    const [white, setWhite] = useState(0);
    const colour = useRef([255,0,0]);

    //page elements that are updated
    const blackSlider = useRef(null);
    const whiteSlider = useRef(null);
    const output = useRef(null);


    //calculates a final rgb value using the user inputs
    function calculateColour(Colour, Black, White)
    {
        //black is dominant over white (if 100% white and 100% balck end colour is black)
        let r = (Colour.current[0] + (White/100 * (255 - Colour.current[0]))) * (100-Black)/100;
        let g = (Colour.current[1] + (White/100 * (255 - Colour.current[1]))) * (100-Black)/100;
        let b = (Colour.current[2] + (White/100 * (255 - Colour.current[2]))) * (100-Black)/100;

        return [r, g, b];
    }

    //outputs colour for user to judge
    function displayColour(Colour, Black, White)
    {
        const rgb = calculateColour(Colour, Black, White);
    
        output.current.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;  
    }
    
    //change colour for black and white spectrums
    function colourInputs(Colour)
    {
        const rgbColour = `rgb(${Colour[0]}, ${Colour[1]}, ${Colour[2]})`;
        let blackRange = `linear-gradient(90deg, ${rgbColour}, black)`;
        let whiteRange = `linear-gradient(90deg, ${rgbColour}, white)`;
    
        blackSlider.current.style.backgroundImage = blackRange;
        whiteSlider.current.style.backgroundImage = whiteRange;
    }
    

    function handleBlack(e)//gets new black value and displays it
    {
        setBlack(e.target.value);
        displayColour(colour, e.target.value, white);
    }

    function handleWhite(e)//gets new white value and displays it
    {
        setWhite(e.target.value);
        displayColour(colour, black, e.target.value);  
    }

    function handleColour(tempColour)//gets new colour and displays it
    {
        colour.current = tempColour;
        displayColour(colour, (100-black)/100, white/100);
        colourInputs(tempColour);
    }

    function saveResults()//saves results to calling object
    {
        childRef.current.style.display = "none";

        props.setStats(calculateColour(colour, black, white));
    }
    
    return(
        <Modal passedRef={childRef} buttonText="Change Text Colour">
            <div className="colourSelectFrame">
                <div className="colourSelectHolder">
                    <div className="colourSelectOut" ref={output} />
                    <input type="range" min="0" max="100" value={black} className="colourSelectB" ref={blackSlider} onChange={handleBlack} />
                    <input type="range" min="0" max="100" value={white} className="colourSelectW" ref={whiteSlider} onChange={handleWhite}/>
                </div>

                <Slider displayFunc={handleColour} /> 

                <button className="colourSelectClose" onClick={saveResults}>Close</button>
            </div>
        </Modal>
    );
}