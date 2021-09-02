import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import tasks from '../../../App';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/all';
const Index = props => {
  const Delete = () => {
    console.log(props.task.id);
    axios.delete(`http://127.0.0.1:8000/task-delete/${props.task.id}`).then(props.updateData);
  };

  return (
    <Draggable draggableId={props.task.id.toString()} index={props.index}>
      {provided => (
        <div
          className="card shadow-sm mb-3 p-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.title}
          <button onClick={Delete}>
            <AiOutlineCloseCircle className="close" />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Index;
