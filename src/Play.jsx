import { useState, createContext, useContext } from 'react'; // Import React and createContext
import { Table } from './Table.jsx';
import { GeneralData } from './App.jsx';

export const TurnoContext = createContext(); // Create a context object

export const Play = ({ cpu }) => {
    const [reseteador, setReseteador] = useState(true);
    const [winner, setWinner] = useState();
    const [turno, setTurno] = useState(true);
    const {setVsPlayer, setVsCpu} = useContext(GeneralData)

    function handleWinner(winner) {
        setWinner(winner);
    }

    function handleTime() {
        setTimeout(() => {
            setReseteador(true);
            setWinner(0);
        }, 1);
    }

    return (
        <>
            <TurnoContext.Provider value={{ turno, setTurno }}>
                <div className={`flex justify-around px-[20px] mt-[60px] `}>
                    <button className='bg-white transition text-black py-[7px] rounded-[10px] px-[20px]' onClick={() => {cpu? setVsCpu(false):setVsPlayer(false)}}>MENU</button>
                    <button className='bg-white transition text-black py-[7px] rounded-[10px] px-[20px]' onClick={() => { setReseteador(false); handleTime() }}>RESTART</button>
                </div>
                {reseteador && (<Table cpu={cpu} sendWinner={handleWinner} />)}
                <div className='flex w-[100vw] justify-between absolute px-[100px] top-[400px] z-[-20]'>
                    
                    <div className="flex justify-center items-center p-[10px] ">
                        <div className={` rounded-[50%] w-[80px] h-[80px] ${!turno?"shadow":"red"} `}></div>
                    </div>
                    <div className='flex justify-center items-center p-[10px] '>
                        <div className={` rounded-[50%] w-[80px] h-[80px] ${turno?"shadow":"yellow"} `}></div>
                    </div>
                </div>
                {winner == 1 && (
                    <div className='bg-blue-400 absolute w-[110vw] top-[670px] left-[-5vw] pl-[10vw] rounded-[10px] p-[20px]'>
                        <h1 className='text-center'>{cpu ? "FELICIDADES, HAZ GANADO" : "JUGADOR 1 HA GANADO"}</h1>
                    </div>
                )}
                {winner == 2 && (
                    <div className='bg-blue-400 absolute w-[110vw] top-[670px] left-[-5vw] pl-[10vw] rounded-[10px] p-[20px]'>
                        <h1 className='text-center'>{cpu ? "LA IA HA GANADO" : "JUGADOR 2 HA GANADO"}</h1>
                    </div>
                )}
                {winner == 3 && (
                    <div className='bg-blue-400 absolute w-[110vw] top-[670px] left-[-5vw] pl-[10vw] rounded-[10px] p-[20px]'>
                        <h1 className='text-center'>EMPATE</h1>
                    </div>
                )}
            </TurnoContext.Provider>
        </>
    );
};
