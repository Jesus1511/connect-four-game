import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Rules = () => {

  const navigator = useNavigate()

  return (
    <div className="flex justify-center w-[100vw] py-[20vw] md:px-[20vw] px-[10vw] ">
      <p className=" text-center">The rules of four in a row are very simple. It is always played between 2 players and on a 7x6 square board. On each turn, each player places a piece of their color in a column and it falls to the first available space. Whoever manages to place 4 pieces of the same color in a row horizontally, vertically or obliquely wins. If no one succeeds, the game ends in a draw.</p>
      <button className="bg-red-500 w-[200px] rounded-[12px] hover:bg-red-600 transition hover:transition absolute left-[50%] translate-x-[-50%] top-[400px] py-[15px] cursor-pointer m-[20px] px-[20px]" onClick={()=>navigator('/')}>Go Back</button>
    </div>
  )
}
