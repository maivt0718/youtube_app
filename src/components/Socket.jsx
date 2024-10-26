import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

const Socket = () => {
    const socket = io('ws://localhost:3000') 
    const [number, setNumber] = useState(0)
    socket.on("send-new-number", (data) => {
        // data: number
        setNumber(data)
    })
  return (
    <div>
        <button onClick={() => {
            socket.emit('send-emit',"")
        }}>Click me</button>
        <button onClick={() => {
            socket.emit('send-reduce',"")
        }}>Reduce me</button>
        <p id='content' className={'text-white'}>{number}</p>
    </div>
  )
}

export default Socket