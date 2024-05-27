import { useContext } from "react"
import { GeneralData } from '../App.jsx';
import { useNavigate } from "react-router-dom";

export const Menu = () => {

    const navigator = useNavigate()
    const {setVs} = useContext(GeneralData)

  return (
    <div className="flex flex-col mt-[200px] items-center">
        <button className="bg-red-500 w-[200px] rounded-[12px] hover:bg-red-600 transition hover:transition py-[15px] cursor-pointer m-[20px] px-[20px]" onClick={()=>{setVs(true); navigator('/play')}}>PLAYER VS IA</button>
        <button className="bg-red-500 w-[200px] rounded-[12px] hover:bg-red-600 transition hover:transition py-[15px] cursor-pointer m-[20px] px-[20px]" onClick={()=>{setVs(false); navigator('/play')}}>PLAYER VS PLAYER</button>
        <button className="bg-red-500 w-[200px] rounded-[12px] hover:bg-red-600 transition hover:transition py-[15px] cursor-pointer m-[20px] px-[20px]" onClick={()=>{navigator('/rules') }}>RULES</button>
    </div>
    
  )
}
