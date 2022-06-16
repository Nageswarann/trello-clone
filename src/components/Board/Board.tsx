import React, { useState } from "react";
import { PLUS_ICON, TICK_ICON } from "../../constants/constant";
import InputContainer from "../InputContainer/InputContainer";
import Task from "../Task/Task";
import { BoardProps, TaskProps } from "../Trello/Trello";
import "./Board.scss";

function Board({
  board,
  deleteBoard,
  boardLength,
  editTitle,
  setBoards,
  draggableNode,
  updateDnD,
  deleteTask,
  updateTask,
}: {
    board:BoardProps,
    deleteBoard: (id:number)=>void,
    boardLength: number,
    editTitle: (id:number, title:string)=>void,
    setBoards: any,
    draggableNode: any,
    updateDnD: (e:{target:any}, param: {boardId: number, taskId: number | null})=>void,
    deleteTask: (boardId: number, taskId: number)=>void,
    updateTask: (boardId: number, taskId: number, title: string)=>void
}) {
  const [boardTitleInput, setBoardTitleInput] = useState(false);

  const addNewTask = (title: string) => {
    let task = {
      id: Math.floor(Math.random() * Date.now()),
      taskTitle: title,
    };
    let newTasks = [...board.tasks, task];
    setBoards((oldBoards: BoardProps[]) => {
      return oldBoards.map((item) =>
        item.id === board.id ? { ...board, tasks: newTasks } : item
      );
    });
  };

  const updateBoardTitle = (title: string) => {
    editTitle(board.id, title);
    setBoardTitleInput(false);
  };

  return (
    <div
      className="container"
      onDragEnter={
        board.tasks.length === 0
          ? (e) => updateDnD(e, { boardId: board.id, taskId: null })
          : undefined
      }
    >
      {boardTitleInput ? (
        <InputContainer updateVal={updateBoardTitle} icon={TICK_ICON} />
      ) : (
        <h2 className="header" onDoubleClick={() => setBoardTitleInput(true)}>
          {board.boardTitle}
        </h2>
      )}
      <div className="tasks-container">
        {board.tasks.map((task: TaskProps) => (
          <Task
            key={task.id}
            task={task}
            board={board}
            draggableNode={draggableNode}
            updateDnD={updateDnD}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
      <InputContainer
        updateVal={(title: string) => addNewTask(title)}
        icon={PLUS_ICON}
      />
      <div
        className={"delete-btn " + (boardLength < 2 && "disable-btn")}
        onClick={() => deleteBoard(board.id)}
      >
        Delete
      </div>
    </div>
  );
}

export default Board;
