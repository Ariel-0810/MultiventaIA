'use client'

import { ChatWindow } from '@/components/dashboard/chat/ChatWindow'

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Chat</h1>
      <ChatWindow />
    </div>
  )
} 