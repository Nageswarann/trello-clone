import { useState } from 'react'
import { TICK_ICON } from '../../constants/constant';
import InputContainer from '../InputContainer/InputContainer';
import { BoardProps, TaskProps } from '../Trello/Trello';
import "./Task.scss"

function Task({
  task,
  board,
  draggableNode,
  updateDnD,
  deleteTask,
  updateTask,
}: {
  task: TaskProps;
  board: BoardProps;
  draggableNode: any;
  updateDnD: (e: any, param: {boardId: number, taskId: number | null}) => void;
  deleteTask: (boardId: number, taskId: number) => void;
  updateTask: (boardId: number, taskId: number, title: string) => void;
}) {
  const [cardTitleInput, setCardTitleInput] = useState(false);

  const handleDragStart = (params: { boardId: number; taskId: number }) => {
    draggableNode.current = params;
  };

  const handleDragEnd = (params: { boardId: number; taskId: number }) => {
    draggableNode.current = params;
  };

  const updateTaskTitle = (boardId: number, taskId: number, title: string) => {
    setCardTitleInput(false);
    updateTask(boardId, taskId, title);
  };

  return (
    <>
      {cardTitleInput ? (
        <InputContainer
          updateVal={(title: string) =>
            updateTaskTitle(board.id, task.id, title)
          }
          icon={TICK_ICON}
        />
      ) : (
        <div
          draggable
          onDragStart={() => {
            handleDragStart({ boardId: board.id, taskId: task.id });
          }}
          onDragEnd={() => {
            handleDragEnd({ boardId: board.id, taskId: task.id });
          }}
          onDragEnter={(e) => {
            updateDnD(e, { boardId: board.id, taskId: task.id });
          }}
          className="task-container"
        >
          <div className="task-title">{task.taskTitle}</div>
          <div className="btn-group">
            <div className="task-icon" onClick={() => setCardTitleInput(true)}>
              <i className="uil uil-pen"></i>
            </div>
            <div
              className="task-icon"
              onClick={() => deleteTask(board.id, task.id)}
            >
              <i className="uil uil-trash-alt"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Task