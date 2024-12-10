
'use client'

import { useState } from 'react'
import { Dumbbell, Send, User, Zap, Brain } from 'lucide-react'

export default function MindMuscleAIChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: formatResponse(data.message) }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsTyping(false)
    }
  }

  const formatResponse = (text) => {
    // Replace ** with <strong> for bold and * with <li> for bullet points
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\* (.*?)\n/g, '<li>$1</li>') // Bullet points
      .replace(/\n/g, '<br/>'); // Line breaks
    return `<ul>${formattedText}</ul>`;
  }

  return (
    <div className="flex flex-col h-screen bg-[#282a36] text-[#f8f8f2]">
      <div className="bg-[#e178b4] text-[#4b002b] p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <Dumbbell className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">MindMuscleAI</h1>
        </div>
        <div className="flex items-center">
          <Zap className="w-6 h-6 mr-1" />
          <Brain className="w-6 h-6" />
        </div>
      </div>
      <div className="flex-grow p-4 space-y-4 overflow-auto">
        {messages.map((m, index) => (
          <div key={index} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`rounded-lg p-4 max-w-[80%] shadow-lg ${
              m.role === 'user' 
                ? 'bg-[#e178b4] text-[#4b002b]' 
                : 'bg-[#3c3f53] text-[#f8f8f2]'
            }`}>
              {m.role === 'user' ? (
                <User className="w-5 h-5 inline mr-2" />
              ) : (
                <Dumbbell className="w-5 h-5 inline mr-2" />
              )}
              <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: m.content }} />
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-[#3c3f53] text-[#f8f8f2] rounded-lg p-3 shadow-lg">
              <Dumbbell className="w-5 h-5 inline mr-2 animate-pulse" />
              Flexing my brain...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#e178b4]">
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about fitness, nutrition, or workouts..."
            className="flex-grow rounded-full bg-[#3c3f53] text-[#f8f8f2] border-2 border-[#e178b4] focus:border-[#e178b4] focus:ring focus:ring-[#e178b4] focus:ring-opacity-50 placeholder-[#f8f8f2] placeholder-opacity-50 p-2"
          />
          <button type="submit" className="rounded-full bg-[#e178b4] text-[#4b002b] hover:bg-[#d067a3] p-2">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

