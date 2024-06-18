"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { BiSolidCalendarCheck } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { PiTableDuotone } from 'react-icons/pi';

export default function AsideComp() {
    const sideRef = useRef<HTMLDivElement | null>(null);
    const [sideDir, setSideDir] = useState('right')
    const pathname = usePathname();

    const handleClickOutside = (ev:MouseEvent) => {
        if (sideRef.current && !sideRef.current?.contains(ev.target as Node)) {
            setSideDir('right');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  return (
      <aside ref={sideRef} className=" h-screen fixed left-0 flex justify-center min-h-screen z-50" >
         <div className=' z-40 top-0  p-1 w-12 bg-gray-800 min-h-screen'>
            {
                sideDir==='right'?
                <FaChevronRight className=' cursor-pointer hover:bg-cyan-300 p-1 size-8 rounded-full' onClick={()=>setSideDir('left')} color="white"/>
                :
                <FaChevronLeft className=' cursor-pointer hover:bg-cyan-300 p-1 size-8 rounded-full' onClick={()=>setSideDir('right')} color="white"/>
            }
         <div className=' items-center flex flex-col mt-3 gap-8'>
                <Link className=" text-gray-50 " href={'/'}><IoHome color={`${pathname=='/'?'blue':'white'}`} className=' cursor-pointer' size={22}/></Link>
                <Link className=" text-gray-50 " href={'/tablepag'}><PiTableDuotone color={`${pathname=='/tablepag'?'blue':'white'}`} className=' cursor-pointer' size={22}/></Link>
                <Link className=" text-gray-50 " href={'/calander'}><BiSolidCalendarCheck color={`${pathname=='/calander'?'blue':'white'}`} className=' cursor-pointer' size={22}/></Link>
         </div>
         </div>
        <div  onClick={(ev)=>ev.preventDefault()} className={` p-3 left-0 z-0  fixed w-60 h-screen pl-12 bg-sky-300 transition-all duration-1000 ${sideDir === 'right' ? '-translate-x-full' : 'translate-x-12 w-60'}`} >
            <div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
            </div>
    </div>
    </aside>
  )
}
