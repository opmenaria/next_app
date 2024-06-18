"use client"
import React, { useEffect } from 'react'
import { FaUserSecret } from "react-icons/fa";
import Link from "next/link";
import { Input } from "antd";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
export default function NavBar() {
    const pathname = usePathname();
  return (
    <nav style={{ zIndex: 50, position: 'fixed', top: 0, width: '100%', backgroundColor: '#6b7280', height: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href={'/'}>
        <FaUserSecret style={{
          marginLeft: '0.75rem',
          left: '0.375rem',
          fontSize: '1.875rem',
          margin: 0
        }}/>
      </Link>
      <div style={{
        display: 'flex',
        width: '10rem',
        justifyContent: 'space-between'
      }}>
        <div>
          <Link style={{
            color: pathname === '/tablepag' ? '#3b82f6' : '#f3f4f6',
            cursor: 'pointer'
          }} href={'/tablepag'}>
            Table
          </Link>
        </div>
        <div>
          <Link style={{
            color: pathname === '/calander' ? '#3b82f6' : '#f3f4f6',
            cursor: 'pointer'
          }} href={'/calander'}>
            Calendar
          </Link>
        </div>
      </div>
      <div style={{ marginRight: '0.75rem' }}>
        <Input disabled type="search" placeholder="Search" suffix={<BiSearch />} />
      </div>
    </nav>
    
  )
}
