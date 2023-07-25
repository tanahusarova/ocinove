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
    positionChangeHead: (id:string, x:number, y:number) => void;
    positionChangeArrow: (id:string, x:number, y:number) => void;
    positionHead: {x:number, y:number};
    positionArrow: {x:number, y:number};

  };

  export const Member: React.FC<NewMember> = (prop) => { 
    
    return(
      <div>
        <Arrow id={`arrow_${prop.id}`} parameters={prop.parameters.arrow} color={prop.color} positionChangeArrow={prop.positionChangeArrow} position={prop.positionArrow}/>
        <Head color={prop.color} name={prop.name} id={prop.id} parameters={prop.parameters.head} positionChangeHead={prop.positionChangeHead} position={prop.positionHead}/>
      </div>
    )

}

export default Member;
