import React from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

interface DraggableComponentProps {
  position: { x: number; y: number };
}

const Arrow = () => {
  const handleDrag: DraggableEventHandler = (e, data) => {
    // Handle drag event
    console.log('Dragged position:', data.x, data.y);
  };

  return (
    <Draggable bounds={{left: 0, top: 0, right: 100, bottom: 200}}>
      <div className='arrow'>
      </div>
    </Draggable>
  );
};

export default Arrow;
