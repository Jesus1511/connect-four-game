import { useEffect, useState } from "react"

export const Timer = ({timeEnd}) => {

    const [time, setTime] = useState(15)

    useEffect(()=>{
        if(time == -1){
            timeEnd(true)
        }
    },[time])

    function timeReducer (){
        setTimeout(() => {
            setTime(time -1)
          }, 1000);
    }

    timeReducer()

  return (
    <>
        <h1>{time}</h1>
    </>
  )
}
