import { useState, useEffect } from "react";
import { checkWin } from "./checkWin";
import { iaSelection } from "./iaSelection";
import { Timer } from "./Timer"

export const Table = ({cpu, sendWinner}) => {

  const [winner, setWinner] = useState(0)
  const [canClick, setCanClick] = useState(true)
  const [reseteador, setReseteador] = useState(true)
  const [turno, setTurno] = useState(true)  
  const [table, setTable] = useState(
      [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
      ]
  );

  function handleClick(row) {
    const newTable = [...table];
    let celda = findSpace(table[row]);

    if (celda === -1) {
      if(cpu && turno == false){
        iaAction()
      } else {return;}
    }

    newTable[row][celda] = turno ? 1 : 2;
    setTable(newTable);
    setTurno(!turno);

    const winnerCheck = checkWin(newTable);
    if (winnerCheck === 1 || winnerCheck === 2) {
      handleWin(winnerCheck);
    }
  }

  function findSpace(column) {
    for (let i = 0; i < column.length; i++) {
      if (column[i] !== 0) {
        return i-1;
      } else if(i == 6){
        return i
      }
    } 
  }
  
  function handleTimeEnd (){
    handleClick(Math.floor(Math.random() * 6))
    setTurno(!turno)
  }

  function handleWin (winners){
    setWinner(winners)
    setTurno(true)
    setCanClick(false)
    sendWinner(winners)
  }

  useEffect(()=>{
    if((cpu && turno == false) || winner !== 0){
      setTimeout(()=>{
        iaAction()
      }, 1000)
  
      setCanClick(false)

    } else {
      setCanClick(true)
    }


    setReseteador(false)
    setTimeout(() => {
      setReseteador(true);
    }, 1); 
  },[turno])

 function iaAction (){
  const iaSelectedRow = iaSelection(table)
  handleClick(iaSelectedRow)
 }


  return (
    <>
      <div className="flex absolute top-[200px] left-[50%] translate-x-[-50%] bg-slate-800 rounded-[20px] ">
          {table.map((row, rowIndex) => (
              <div className={`flex flex-col justify-center items-center ${canClick?"cursor-pointer ":""} md:px-[20px] active:bg-slate-700 md:w-[80px]  w-[55px]`} onClick={canClick ? () => handleClick(rowIndex) : null} key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                      <span className={`inline-block m-[15px] mx w-[35px] rounded-[50%] md:w-[50px] md:h-[50px] h-[35px] ${table[rowIndex][cellIndex] == 2 && "bg-yellow-500"} ${table[rowIndex][cellIndex] == 1 && "bg-red-500"} ${table[rowIndex][cellIndex] == 0 && "bg-[#1b1b1b]"}`}  key={cellIndex}></span>
                  ))}
              </div>
          ))}
      </div>
      <div className="md:mt-[680px] mt-[650px] text-[30px] mb-[100px] flex justify-center">
        {reseteador && winner == 0 && (<Timer timeEnd={handleTimeEnd}/>)}
      </div>
    </>
  );
  };
