import { useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import ParametersTopLeft from './ParametersTopLeft';


type NewMember = {
    color: string;
    name: string;
    id: string;
    parameters: string;
};

  export const Head: React.FC<NewMember> = (prop) => { 
    const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0});


    const buttonStyle = {
        background: `${prop.color}`,
        width: '90px',
        height: '90px',
        borderRadius: '90px', 
        transform: `${prop.parameters}`,  
        top: '120px',
        left: '1220px',
      };

      
      const handleDrag = (e:any, ui:any) => {
          const { x, y } = deltaPosition;
      
          setDeltaPosition({
              x: x + ui.deltaX,
              y: y + ui.deltaY,
          });
      };
    

    return(
    <div className='member_shape'>
    <Draggable onDrag={handleDrag}>
        <button style={buttonStyle} id={prop.id}>
            <div className='member_inside'>
                <div> {prop.name} </div>
            </div>
        </button>
      </Draggable>
      </div>
    )


}


export default Head;
