import ColourSelect from './Componenet/ColourSelect.js';
import {useState} from 'react';

function App() {
  //r, g, b, ratio, black, white
  const [colour, setColour] = useState([0,0,0]);

  return (
    <div>
      <ColourSelect setStats={setColour}/> 
      <p style={{color: `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`}}
        
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. lacus nec metus 
        bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
         vel class aptent taciti.</p>
    </div>
  );
}

export default App;