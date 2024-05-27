import { useState, useEffect, useContext } from "react";
import { TurnoContext } from "./Play";
import { checkWin } from "../ia/checkWin";
import { iaSelection } from "../ia/iaSelection";
import confetti from "canvas-confetti";

export const Table = ({cpu, sendWinner}) => {

  const [winner, setWinner] = useState(0)
  const [canClick, setCanClick] = useState(true)
  const {turno, setTurno} = useContext(TurnoContext)
  const [table, setTable] = useState(
      [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
      ]
  );

//   la ia nos va a reemplazar

// o al menos eso dijo este señor, asi que queria confirmar si esta es capas de vencer a un humano en algún juego de razonamiento

// o antes de eso, si yo soy capas de crear una ia que gane a un humano en un juego de razonamiento

// como no queria morir intentandolo con el ajedrez
// o que hubieran empates infinitos con el tictactoe
// asi que elegi el conecta cuatro

// juego amado por todos
// que es sencillo pero que tambien requiere que pienses bien en lo que vas a hacer

// por lo que despues despues de alrededor de una sesion de unas 8 - 9 horas 
// mi hijo estaba listo
// asi que lo puse aprueba contra otras personas alrededor del mundo
// y esto fue lo que paso


    function ramdonClick (){
      handleClick(Math.floor(Math.random() * 7))
    }


  function handleClick(row) {
    const newTable = [...table];
    if (row == undefined){
      ramdonClick()
      return
    }
    let celda = findSpace(table[row]);

    if (celda == -1) {
      if(cpu && turno == false){
        ramdonClick()
        return
      }
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
      } else if(i == 7){
        return i
      }
    } 
    return 5
  }

  function handleWin (winners){
    confetti()
    setWinner(winners)
    setTurno(true)
    setCanClick(false)
    sendWinner(winners)
  }

  useEffect(()=>{
    if(cpu && turno == false && winner == 0){
      setTimeout(()=>{
        iaAction()
      }, 1069)
  
      setCanClick(false)

    } else {
      setCanClick(true)
    }

    if(fullTable()){
      handleWin(3)
    }

  },[turno])

  function fullTable (){
    for (let fila of table) {
      for (let elemento of fila) {
        if (elemento === 0) {
          return false; // Si encuentra un cero, retorna false
        }
      }
    }
    return true; // Si no encuentra ningún cero, retorna true
  }


 function iaAction (){
  const iaSelectedRow = iaSelection(table)
  handleClick(iaSelectedRow)
 }


  return (
    <>
      <div className="flex absolute transision top-[200px] left-[50%] translate-x-[-50%] bg-slate-800 rounded-[20px]">
          {table.map((row, rowIndex) => (
              <div className={`flex flex-col justify-center items-center ${canClick?"cursor-pointer ":""} md:px-[20px] transition ${turno && "hover:bg-slate-700"} md:w-[80px] w-[47px]`} onClick={canClick ? () => handleClick(rowIndex) : null} key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                      <span className=" m-[10px] lg:m-[15px] mx flex justify-center items-center w-[45px] rounded-[50%] md:w-[65px] md:h-[50px] bg-transparent h-[35px]"  key={cellIndex}>
                        {table[rowIndex][cellIndex] == 2 && (
                          <span className="w-[35px] megaAnimation inline-block mx rounded-[50%] md:w-[50px] md:h-[50px] h-[35px] z-10 bg-yellow-400"></span>
                        )}
                        {table[rowIndex][cellIndex] == 1 && (
                          <span className="w-[35px] megaAnimation inline-block mx rounded-[50%] md:w-[50px] md:h-[50px] h-[35px] z-10 bg-red-500"></span>
                        )}
                        {table[rowIndex][cellIndex] == 0 && (
                          <span className="w-[35px] inline-block mx rounded-[50%] md:w-[50px] md:h-[50px] h-[35px] z-10 bg-[#202020]"></span>
                        )}
                      </span>
                  ))}
              </div>
          ))}
      </div>
    </>
  );
  };
