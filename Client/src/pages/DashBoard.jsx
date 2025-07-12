import React from 'react'
import ShortenForm from '../components/ShortenForm'
import UserUrl from '../components/UserUrl'
import { useState } from 'react'

const DashboardPage = () => {
  const [isReLoading, setIsReLoading] = useState(false);
  return (
    <div className="   flex flex-col items-center justify-center p-4">
    <div className=" mb-10  rounded-lg shadow-md w-full max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
      <ShortenForm setIsReLoading={setIsReLoading}/>
      <UserUrl setIsReLoading={setIsReLoading} isReLoading={isReLoading}/>
    </div>
  </div>
  )
}

export default DashboardPage