import { useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import Arrow from './Arrow';


type NewMember = {
    name: string;
    id: string;
    color: string;
  };

  export const Member: React.FC<NewMember> = (prop) => { 
    const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0});
    const[rotation, setRotation] = useState(0);
    const deg = 5;


    const buttonStyle = {
        background: `${prop.color}`,
        width: '90px',
        height: '90px',
        borderRadius: '90px',    
      };
    
    const rot = () => {
        let tmp = (rotation + deg) % 360;
        setRotation(tmp);
      };

      
      const handleDrag = (e:any, ui:any) => {
          const { x, y } = deltaPosition;
      
          setDeltaPosition({
              x: x + ui.deltaX,
              y: y + ui.deltaY,
          });
      
        //  setRotation(rotation + ui.deltaX / 20);
      };
    

    return(
    <div className='member_shape'>
    <Draggable onDrag={handleDrag}>
      <div>
        <Arrow />
        <button style={buttonStyle} id={prop.id}>
            <div className='member_inside'>
                <div className='eyes'> • • </div>
                <div> {prop.name} </div>
          </div>
        </button>
        </div>
      </Draggable>
      </div>
    )


}


export default Member;
