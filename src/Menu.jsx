import { useContext } from "react"
import GeneralData from './App';

export const Menu = () => {

    const {setVsPlayer, setVsCpu, setRules} = useContext(GeneralData)

  return (
    <div className="flex flex-col mt-[200px] items-center">
        <button className="bg-red-500 w-[200px] rounded-[12px] hover:bg-red-600 transition hover:transition py-[15px] cursor-pointer m-[20px] px-[20px]" onClick={()=>{setVsCpu(true)}}>PLAYER VS IA</button>
        <button className="bg-red-500 w-[200px] rounded-[12px] hover:bg-red-600 transition hover:transition py-[15px] cursor-pointer m-[20px] px-[20px]" onClick={()=>{setVsPlayer(true)}}>PLAYER VS PLAYER</button>
        <button className="bg-red-500 w-[200px] rounded-[12px] hover:bg-red-600 transition hover:transition py-[15px] cursor-pointer m-[20px] px-[20px]" onClick={()=>{setRules(true)}}>RULES</button>
    </div>
    
  )
}
