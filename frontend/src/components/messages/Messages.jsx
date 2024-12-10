import React, { useRef, useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/usegetMessages'
import useListenMessage from '../../hooks/useListenMessage'

function Messages() {
  const { messages } = useGetMessages()
  useListenMessage()
  const lastMessageRef = useRef()

 
  useEffect(() => {
    if (messages.data && messages.data.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages.data]) 

  console.log(messages.data);
  
  if (messages.data === undefined) {
    return <p>Loading...</p> 
  }

  const messag = messages.data

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messag.length === 0 && (
        <p>Say Hi ✋ to the chat.</p>
      )}

      {messag.length > 0 && messag.map((message, index) => (
        <div
          key={message._id}
          ref={index === messag.length - 1 ? lastMessageRef : null} 
        >
          <Message message={message} />
        </div>
      ))}
    </div>
  )
}

export default Messages
