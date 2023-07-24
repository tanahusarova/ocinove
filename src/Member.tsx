import { useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import Arrow from './Arrow';
import Head from './Head';
import Parameters from './Parameters';
import ParametersTopLeft from './ParametersTopLeft';


type NewMember = {
    name: string;
    id: string;
    color: string;
    parameters:Parameters;
  };

  export const Member: React.FC<NewMember> = (prop) => { 
    
    return(
      <div>
        <Arrow id={`arrow_${prop.id}`} parameters={prop.parameters.arrow} color={prop.color}/>
        <Head color={prop.color} name={prop.name} id={prop.id} parameters={prop.parameters.head}/>
      </div>
    )

}

export default Member;
