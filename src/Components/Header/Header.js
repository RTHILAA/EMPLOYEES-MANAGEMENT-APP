import React from 'react'
import './Header.css'
import { Users } from 'lucide-react'

export default function Header() {
  return (
    <div className="Header">
      <div className="header-content">
        <Users className="header-icon" size={28} />
        <span>Employee Management System</span>
      </div>
    </div>
  )
}