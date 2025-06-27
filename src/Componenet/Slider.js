import "../CSS/Slider.css";
import {useRef, useState, useEffect} from 'react';

export default function Slider(props)
{
    const down = useRef(false);//tracks if user is dragging knob

    //references to html elements
    const frame = useRef(null);
    const rail = useRef(null);
    const knob = useRef(null);

    const positon = useRef(0);//how far knob is on rail as a %

    const options = 200;//number of different options on this slider

    //rerenders knob in correct position when screen size changes
    function repositionKnob()
    {
        let move = (rail.current.clientWidth - knob.current.clientWidth) * positon.current;
                
        knob.current.style.left = move+ "px"
    }
    useEffect(()=>{
        window.addEventListener('resize', repositionKnob);
        return () => {
           window.removeEventListener('resize', repositionKnob);
         };
    },[])

    function getSlideVal()//finds knobs position on the rail
    {
        let space = rail.current.clientWidth - knob.current.clientWidth;

        let step = space/options;

        return Math.floor(knob.current.offsetLeft/step) + 1;
    }

    function moveKnob(e)//rerenders knob on drag
    {    
        let hoff = frame.current.offsetLeft;
        let ex = (frame.current.clientWidth - (rail.current.clientWidth - knob.current.clientWidth))/2;
        let move = (e.clientX - hoff);//position relative to this element

        if(move >= 0 && move <= ex)//if mouse before rail move knob to minimum position
        {
            move = 0;
        }
        else if(move >= (rail.current.clientWidth - knob.current.clientWidth) + ex)//if mouse after rail move to max
        {
            move = (rail.current.clientWidth - knob.current.clientWidth);
        }
        else//move to mouse
        {
            move -= ex;
        }

        //used to reposition knob on rerender
        let percentage = move/(rail.current.clientWidth - knob.current.clientWidth)
        positon.current = percentage;
        
        knob.current.style.left = move+ "px"
    }

    //returns part of the linear gradient that the knov is on
    function colour(val)
    {
        let maxV= 201;
        //rgb of each element in the linear gradient
        let cols = [[255,0,0],[255,255,0],[0, 255, 0],[0,255,255], [0, 0, 255], [255,0,255],[255,0,0]];
        let lens = cols.length -1;
        let gaps = Math.ceil(maxV/lens);
        //conpres knob's range into a combination of two of our colours
        let index = Math.floor((val-1)/gaps);
        let mix = val/gaps - index;

        //mix these two colours by thier ratios
        let a = cols[index][0] * (1-mix) + cols[index+1][0] * mix;
        let b = cols[index][1] * (1-mix) + cols[index+1][1] * mix;
        let c = cols[index][2] * (1-mix) + cols[index+1][2] * mix;
    
        return [a,b,c];
    }

    ///move the knob at users will and recolour knob to reflect what colour it is above
    function handleMouseMove(e)
    {
        if(down.current == true)
        {
            moveKnob(e);//rerender the knob
            
            //find what colour the knob is now above
            let val = getSlideVal();
            let temp  = colour(val);

            //colour the knob
            const rgbColour = `rgb(${temp[0]}, ${temp[1]}, ${temp[2]})`;
            knob.current.style.backgroundColor = rgbColour;

            //telling parent colour has changed
            props.displayFunc(temp);
        }
    }

    //tracking interaction with the knob
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