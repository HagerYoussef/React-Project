import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(myprops) {
  if(localStorage.getItem('userToken')!==null){
    return myprops.children;
  }
  else{
    return <Navigate to='/signin'></Navigate>
  }
  return (
    <div>
      
    </div>
  )
}
