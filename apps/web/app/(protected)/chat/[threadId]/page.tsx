'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  ChatList,
  type ChatListItem,
} from '../../../../components/chat/ChatList';
import { ChatMessageData } from '../../../../components/chat/ChatMessage';
import { ChatWindow } from '../../../../components/chat/ChatWindow';

const mockChats: ChatListItem[] = [
  {
    id: '1',
    name: 'Martin Santos',
    initials: 'MS',
    avatar: '',
    lastMessage: 'Thanks for the cleaning service!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Jemma Lee',
    initials: 'JL',
    avatar: '',
    lastMessage: 'When can you start the tutoring session?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Alex Johnson',
    initials: 'AJ',
    avatar: '',
    lastMessage: "I'll be there at 3 PM for the repairs",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 1,
    isOnline: true,
  },
];

const mockMessagesByThreadId: Record<string, ChatMessageData[]> = {
  '1': [
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
  ],
  '2': [
    {
      id: '1',
      content: 'Hi! I need help with math tutoring for my daughter.',
      sender: { name: 'You', initials: 'LR', avatar: '' },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isCurrentUser: true,
      status: 'read',
    },
    {
      id: '2',
      content: "Hello! I'd be happy to help. What grade is she in?",
      sender: { name: 'Jemma Lee', initials: 'JL', avatar: '' },
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      isCurrentUser: false,
    },
    {
      id: '3',
      content: "She's in 8th grade. When can you start the tutoring session?",
      sender: { name: 'You', initials: 'LR', avatar: '' },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isCurrentUser: true,
      status: 'delivered',
    },
  ],
  '3': [
    {
      id: '1',
      content: 'Hi! I need help with my car repair.',
      sender: { name: 'You', initials: 'LR', avatar: '' },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isCurrentUser: true,
      status: 'read',
    },
    {
      id: '2',
      content: 'What seems to be the problem with your car?',
      sender: { name: 'Alex Johnson', initials: 'AJ', avatar: '' },
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
      isCurrentUser: false,
    },
    {
      id: '3',
      content:
        "The engine is making a strange noise. I'll be there at 3 PM for the repairs",
      sender: { name: 'You', initials: 'LR', avatar: '' },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isCurrentUser: true,
      status: 'delivered',
    },
  ],
};

const ThreadPage = () => {
  const router = useRouter();
  const [selectedChatId, setSelectedChatId] = useState<string>('1');

  const selectedChat =
    mockChats.find(chat => chat.id === selectedChatId) || mockChats[0];
  const [messages, setMessages] = useState<ChatMessageData[]>(
    mockMessagesByThreadId[selectedChatId] || []
  );

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

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setMessages(mockMessagesByThreadId[chatId] || []);
  };

  const handleBack = () => {
    router.push('/chat');
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Chat list - hidden on mobile, visible on desktop */}
      <div className="hidden md:flex md:w-80 bg-white border-r border-gray-200 flex-col p-4">
        <ChatList
          chats={mockChats}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Chat window - full width on mobile, flex-1 on desktop */}
      <div className="flex-1 flex flex-col">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          recipientName={selectedChat.name}
          recipientAvatar={selectedChat.avatar}
          recipientInitials={selectedChat.initials}
          isOnline={selectedChat.isOnline}
          isTyping={false}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default ThreadPage;
