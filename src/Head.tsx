import { useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import ParametersTopLeft from './ParametersTopLeft';


type NewMember = {
    color: string;
    name: string;
    id: string;
    parameters: string;
    positionChangeHead: (id:string, x:number, y:number) => void;
    position:{x:number, y:number};

};

  export const Head: React.FC<NewMember> = (prop) => { 
    const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0});
    const [x, setX]= useState(prop.position.x)
    const [y, setY]= useState(prop.position.y)
    const [width, setWidth]=useState(prop.name.length < 7 ? 90 : prop.name.length * 16);



    const handleStop = (event:any, dragElement:any) => {
        setX(dragElement.x)
        setY(dragElement.y)
        console.log(x, y);
        prop.positionChangeHead(prop.id, dragElement.x, dragElement.y);
    };


    const buttonStyle = {
        background: `${prop.color}`,
        width: `${width}px`,
        height: `${width}px`,
        borderRadius: `${width}px`, 
        zIndex: 1,
        outlineStyle: 'solid',
        outlineColor: 'rgb(150, 145, 145)',

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
    <Draggable 
        onStop={handleStop} 
        position={{x: x, y:y}}>
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
