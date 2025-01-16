import React from 'react'
import { FaRegCircle } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { CiTrash } from "react-icons/ci";


const Task = () => {
  return (
    <div className='w-[32%] h-[92px] rounded-md px-2 py-2 border border-[#E9EAEB] hover:border-[#17655B] bg-white hover:border-2 transition-colors duration-300'>
        <div className='flex justify-between'>
            <div className='flex gap-1'>
                <FaRegCircle style={{fontSize:"22px"}} className='text-[#A4A7AE] cursor-pointer'/>
                <h2 className='text-[#414651] font-medium' style={{fontSize:"14px"}}>Agriculture</h2>
            </div>
            <div className='flex items-center gap-2'>
                <LuPencil style={{fontSize:"22px"}} className='text-[#A4A7AE]'/>
                <CiTrash style={{fontSize:"22px"}} className='text-[#A4A7AE]'/>
            </div>    
        </div>
        <div className='mt-2'>
            <p className='text-[#535862]' style={{fontSize:'14px'}}>Activités agricoles, culture de plantes, l'élevage d'animaux...</p>
        </div>    
    </div>
  )
}

export default Task