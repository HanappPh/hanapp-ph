'use client';

import { Button } from '@hanapp-ph/commons';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ChatMessageData } from '../../../components/chat/ChatMessage';
import { ChatWindow } from '../../../components/chat/ChatWindow';

const ThreadPage = () => {
  const router = useRouter();
  // Static single chat view: inline sample conversation
  const chat = {
    id: '1',
    name: 'Martin Santos',
    initials: 'MS',
    avatar: '',
    isOnline: true,
  };
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: '1',
      content:
        'Hi! I saw you offer cleaning services. Are you available this weekend?',
      sender: { name: 'You', initials: 'LR', avatar: '' },
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isCurrentUser: true,
      status: 'read',
    },
    {
      id: '2',
      content:
        "Hello! Yes, I'm available this Saturday. What time works best for you?",
      sender: { name: 'Martin Santos', initials: 'MS', avatar: '' },
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      isCurrentUser: false,
    },
    {
      id: '3',
      content:
        'Great! How about 10 AM? I have a 2-bedroom apartment that needs deep cleaning.',
      sender: { name: 'You', initials: 'LR', avatar: '' },
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      isCurrentUser: true,
      status: 'read',
    },
    {
      id: '4',
      content:
        'Perfect! That works for me. I charge ₱800 for a 2-bedroom deep clean. Should I bring all cleaning supplies?',
      sender: { name: 'Martin Santos', initials: 'MS', avatar: '' },
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isCurrentUser: false,
    },
    {
      id: '5',
      content:
        "Yes please, bring everything needed. I'll send you the address closer to Saturday. Thanks for the cleaning service!",
      sender: { name: 'You', initials: 'LR', avatar: '' },
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isCurrentUser: true,
      status: 'delivered',
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessageData = {
      id: Date.now().toString(),
      content,
      sender: { name: 'You', initials: 'LR', avatar: '' },
      timestamp: new Date(),
      isCurrentUser: true,
      status: 'sent',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/chat')}
          className="text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to chats
        </Button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex">
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            recipientName={chat.name}
            recipientAvatar={chat.avatar}
            recipientInitials={chat.initials}
            isOnline={chat.isOnline}
            isTyping={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
