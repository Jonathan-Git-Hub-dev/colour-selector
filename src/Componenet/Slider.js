import "../CSS/Slider.css";
import {useRef} from 'react';

export default function Slider(props)
{
    const down = useRef(false);

    const frame = useRef(null);
    const rail = useRef(null);
    const knob = useRef(null);

    const options = 200;

    function getSlideVal()
    {
        let space = rail.current.clientWidth - knob.current.clientWidth;

        let step = space/options;

        return Math.floor(knob.current.offsetLeft/step) + 1;
    }

    function moveKnob(e)
    {    
        let hoff = frame.current.offsetLeft;
        let ex = (frame.current.clientWidth - (rail.current.clientWidth - knob.current.clientWidth))/2;
        let move = (e.clientX - hoff);
        if(move >= 0 && move <= ex)
        {
            move = 0;
        }
        else if(move >= (rail.current.clientWidth - knob.current.clientWidth) + ex)
        {
            move = (rail.current.clientWidth - knob.current.clientWidth);
        }
        else
        {
            move -= ex;
        }
        
        knob.current.style.left = move+ "px"
    }

    //calculate user's colour choice
    function cl(val)
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
    
        return [a,b,c];
    }

    function handleMouseMove(e)
    {
        if(down.current == true)
        {
            moveKnob(e);
            let val = getSlideVal();
            let temp  = cl(val);

            const rgbColour = `rgb(${temp[0]}, ${temp[1]}, ${temp[2]})`;
            knob.current.style.backgroundColor = rgbColour;

            props.displayFunc(temp);
        }
    }

    function handleMouseUpLeave()
    {
        down.current = false;  
    }

    function handleMouseDown()
    {
        down.current = true;
    }

    return (
        <div
            className="sliderFrame"
            ref={frame}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpLeave}
            onMouseLeave={handleMouseUpLeave}
                    
        >
            <div className="sliderRail" ref={rail}>
                <div className="sliderKnob" ref={knob}
                    onMouseDown={handleMouseDown}
                />
            </div>
        </div>
    );

}