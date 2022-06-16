import React, { useState, useRef } from 'react'
import Board from '../Board/Board'
import "./Trello.scss"

export interface BoardProps {
    id: number
    boardTitle: string
    tasks: Array <TaskProps>
}

export interface TaskProps {
    id: number
    taskTitle: string
}


function Trello() {
    const [boards, setBoards] = useState <Array<BoardProps>>([{
            id: 1,
            boardTitle: "Board1",
            tasks: []
        }]);

    const draggableNode = useRef<any>();

    const addNewBoard = () => {
        const newBoard = {
            id: Math.floor(Math.random() * Date.now()),
            boardTitle: "New Board",
            tasks: []
        }
        setBoards([...boards, newBoard]);
    }

    const deleteBoard = (id: number) => {
        if(boards.length < 2) return;
        setBoards(boards.filter((board: BoardProps) => board.id !== id));
    }

    const editTitle = (id: number, title: string) => {
        setBoards(boards.map((board: BoardProps)=> (board.id === id) ? {...board, boardTitle: title} : board));
    }

    const deleteTask = (boardId: number, taskId: number) => {
        let boardIdx = boards.findIndex((item:BoardProps) =>(item.id === boardId));
        let newTasks = boards[boardIdx].tasks.filter((item:TaskProps) => item.id !== taskId);
        setBoards((oldBoards: BoardProps[]) => oldBoards.map((board: BoardProps, idx: number)=> (idx === boardIdx) ? {...board, tasks: newTasks} : board));
    }

    const updateTask = (boardId: number, taskId: number, title: string) => {
        let boardIdx = boards.findIndex((item:BoardProps) =>(item.id === boardId));
        let newTasks = boards[boardIdx].tasks.map((item:TaskProps) => (item.id === taskId)? {...item, taskTitle: title} : item);
        setBoards((oldBoards:BoardProps[]) => oldBoards.map((board: BoardProps, idx: number)=> (idx === boardIdx) ? {...board, tasks: newTasks} : board));
    }


    const updateDnD = (e: { target:  any }, param: { boardId: number; taskId: number | null }) => {
        let currentItem = draggableNode.current; 
        if(e.target !== currentItem && currentItem) {
            setBoards((oldBoards: BoardProps[]) => {
                let newBoards = JSON.parse(JSON.stringify(oldBoards));

                let boardIdx = oldBoards.findIndex((item:BoardProps) =>(item.id === param.boardId));
                let taskIdx = oldBoards[boardIdx].tasks.findIndex((item:TaskProps) => item.id === param.taskId);

                let currentBoardIdx = oldBoards.findIndex((item:BoardProps)=> item.id === currentItem.boardId);
                let currrentTaskIdx = oldBoards[currentBoardIdx].tasks.findIndex((item: TaskProps) => item.id === currentItem.taskId);

                if(currrentTaskIdx != -1)
                    newBoards[boardIdx].tasks.splice(taskIdx, 0, newBoards[currentBoardIdx].tasks.splice(currrentTaskIdx,1)[0]);
                else if(currrentTaskIdx === null) 
                    newBoards[boardIdx].tasks.splice(0, 0, newBoards[currentBoardIdx].tasks.splice(currrentTaskIdx,1)[0]);
                
                return newBoards;
            })
        }
    }

  return (
    <div className="trello-container">
      {boards.map((board: BoardProps) => (
        <Board
          key={board.id}
          board={board}
          deleteBoard={deleteBoard}
          boardLength={boards.length}
          editTitle={editTitle}
          setBoards={setBoards}
          draggableNode={draggableNode}
          updateDnD={updateDnD}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}

      {boards.length < 5 && (
        <div className="add-board" onClick={() => addNewBoard()}>
          <i className="uil uil-plus add-board-icon"></i>
        </div>
      )}
    </div>
  );
}

export default Trello