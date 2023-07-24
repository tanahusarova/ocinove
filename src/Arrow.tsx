import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import Draggable, { DraggableEventHandler } from 'react-draggable';
import ParametersTopLeft from "./ParametersTopLeft";

type NewMember = {
  id:string;
  parameters: string;
  color: string;

};

export const Arrow: React.FC<NewMember> = (prop) => { 
//  const [deltaPosition, setDeltaPosition] = useState({0, top: prop.parameters.top});

  const buttonStyle = {
    transform: `${prop.parameters}`,   
    backgroundColor: prop.color,
    top: `90px`,
    left: `1255px`,
};

/*
  const handleDrag: DraggableEventHandler = (e:any, ui:any) => {
    const { left, top } = deltaPosition;
      
 
    setDeltaPosition({
        left: left + ui.deltaX,
        top: top + ui.deltaY,
    });
    console.log("psuvam arrow");

  };
  */

  return (
    <div style={{transform: `${prop.parameters}`}}>
    <Draggable>
      <div id={prop.id} className='arrow' style={buttonStyle}>
      </div>
    </Draggable>
  </div>
  );
};

export default Arrow;
