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
    <aside ref={sideRef} style={{ height: '100vh', position: 'fixed', left: 0, display: 'flex', justifyContent: 'center', minHeight: '100vh', zIndex: 50 }}>
    <div style={{ zIndex: 40, top: 0, padding: '0.25rem', width: '3rem', backgroundColor: '#2D3748', minHeight: '100vh' }}>
      {
        sideDir === 'right' ?
        <FaChevronRight style={{ cursor: 'pointer', backgroundColor: '#6B7280', padding: '0.25rem', fontSize: '1.25rem', borderRadius: '50%' }} onClick={() => setSideDir('left')} color="white" />
        :
        <FaChevronLeft style={{ cursor: 'pointer', backgroundColor: '#6B7280', padding: '0.25rem', fontSize: '1.25rem', borderRadius: '50%' }} onClick={() => setSideDir('right')} color="white" />
      }
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '0.75rem', gap: '2rem' }}>
        <Link style={{ color: '#D1D5DB' }} href={'/'}>
          <IoHome color={pathname === '/' ? 'blue' : 'white'} style={{ cursor: 'pointer' }} size={22} />
        </Link>
        <Link style={{ color: '#D1D5DB' }} href={'/tablepag'}>
          <PiTableDuotone color={pathname === '/tablepag' ? 'blue' : 'white'} style={{ cursor: 'pointer' }} size={22} />
        </Link>
        <Link style={{ color: '#D1D5DB' }} href={'/calander'}>
          <BiSolidCalendarCheck color={pathname === '/calander' ? 'blue' : 'white'} style={{ cursor: 'pointer' }} size={22} />
        </Link>
      </div>
    </div>
  
    <div onClick={(ev) => ev.preventDefault()} style={{ padding: '0.75rem', left: 0, zIndex: 0, position: 'fixed', width: '60%', height: '100vh', paddingLeft: '3rem', backgroundColor: '#93C5FD', transition: 'all 1s', transform: sideDir === 'right' ? 'translateX(-100%)' : 'translateX(0)', maxWidth: '60%' }}>
  <div>
    <div style={{ backgroundColor: '#22D3EE', borderRadius: '9999px', padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem', cursor: 'pointer' }}><IoSettingsOutline />Setting</div>
    <div style={{ backgroundColor: '#22D3EE', borderRadius: '9999px', padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem', cursor: 'pointer' }}><IoSettingsOutline />Setting</div>
    <div style={{ backgroundColor: '#22D3EE', borderRadius: '9999px', padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem', cursor: 'pointer' }}><IoSettingsOutline />Setting</div>
    <div style={{ backgroundColor: '#22D3EE', borderRadius: '9999px', padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem', cursor: 'pointer' }}><IoSettingsOutline />Setting</div>
    <div style={{ backgroundColor: '#22D3EE', borderRadius: '9999px', padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem', cursor: 'pointer' }}><IoSettingsOutline />Setting</div>
  </div>
</div>

    </aside>
  )
}
