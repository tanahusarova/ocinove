import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import Draggable, { DraggableEventHandler } from 'react-draggable';
import ParametersTopLeft from "./ParametersTopLeft";

type NewMember = {
  id:string;
  parameters: string;
  color: string;
  positionChangeArrow: (id:string, x:number, y:number) => void;
  position:{x:number, y:number};
};

export const Arrow: React.FC<NewMember> = (prop) => { 
//  const [deltaPosition, setDeltaPosition] = useState({0, top: prop.parameters.top});
const [x, setX]= useState(prop.position.x)
const [y, setY]= useState(prop.position.y)

const handleStop = (event:any, dragElement:any) => {
  setX(dragElement.x)
  setY(dragElement.y)
  console.log(x, y);
  prop.positionChangeArrow(prop.id, dragElement.x, dragElement.y);
};

  const buttonStyle = {
    backgroundColor: prop.color,
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
    <Draggable  
    onStop={handleStop} 
    position={{x: x, y:y}}>
      <div id={prop.id} className='arrow' style={buttonStyle}>
      </div>
    </Draggable>
  );
};

export default Arrow;
