import { useState } from 'react'
import {Table} from './Table.jsx'

export const Play = ({ cpu }) => {

    const [reseteador, setReseteador] = useState(true)
    const [winner, setWinner] = useState()

    function handleWinner (winner){
        setWinner(winner)
    }

    function handleTime (){
        setTimeout(() => {
          setReseteador(true);
          setWinner(0)
        }, 1); 
      }

  return (
    <>
        <div className='flex justify-around px-[20px] mt-[60px]'>
            <button className='bg-white text-black py-[7px] rounded-[10px] px-[20px]' onClick={()=>window.location.reload()}>MENU</button>
            <button className='bg-white text-black py-[7px] rounded-[10px] px-[20px]' onClick={()=>{setReseteador(false);handleTime()}}>RESTART</button>
        </div>
        <div>
            <div className='bg-red-500 absolute w-[160px] left-[-10px] top-[140px] rounded-[10px] py-[10px] px-[20px]'>
                <h2>PLAYER 1</h2>
                <div></div>
            </div>
            <div className='bg-yellow-400 absolute w-[160px] right-[-10px] top-[140px] rounded-[10px] py-[10px] px-[20px]'>
                <h2 className='text-right pr-[20px]'>{cpu?"CPU":"PLAYER 2"}</h2>
                <div></div>
            </div>
        </div>
        {reseteador && (<Table cpu={cpu} sendWinner={handleWinner}/>)}
        {winner == 1 && (
            <div className='bg-blue-400 rounded-[10px] p-[20px]'>
                <h1>{cpu?"FELICIDADES, HAZ GANADO":"JUGADOR 1 AH GANADO"}</h1>
            </div>
        )}
        {winner == 2 && (
            <div className='bg-blue-400 absolute w-[110vw] top-[670px] left-[-5vw] pl-[10vw] rounded-[10px] p-[20px]'>
                <h1 className='text-center'>{cpu?"LA IA AH GANADO":"JUGADOR 2 AH GANADO"}</h1>
            </div>
        )}
    </>
  )
}
