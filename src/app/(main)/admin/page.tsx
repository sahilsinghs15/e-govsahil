import AdminAppbar from '@/components/AdminAppbar'
import AdminHome from '@/components/AdminHome'
import React from 'react'

export default function page() {
  return (
    <div>
      Admin Page
      <AdminAppbar/>
      <AdminHome/>
    </div>
  )
}
