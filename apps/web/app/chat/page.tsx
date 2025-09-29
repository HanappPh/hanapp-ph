'use client';

import { useState } from 'react';

import { ChatList, ChatListItem } from '../../components/chat/ChatList';
import { ChatMessageData } from '../../components/chat/ChatMessage';
import { ChatWindow } from '../../components/chat/ChatWindow';
import { NavigationHeader } from '../../components/navigation/NavigationHeader';

// Test data
const mockChats: ChatListItem[] = [
  {
    id: '1',
    name: 'Martin Santos',
    initials: 'MS',
    avatar: '', // Empty string to force fallback to initials
    lastMessage: 'Thanks for the cleaning service!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Jemma Lee',
    initials: 'JL',
    avatar: '', // Empty string to force fallback to initials
    lastMessage: 'When can you start the tutoring session?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Alex Johnson',
    initials: 'AJ',
    avatar: '', // Empty string to force fallback to initials
    lastMessage: "I'll be there at 3 PM for the repairs",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 1,
    isOnline: true,
  },
];

const mockMessages: ChatMessageData[] = [
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
];

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const [messages, setMessages] = useState<ChatMessageData[]>(mockMessages);

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

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
      <NavigationHeader activeTab="chat" />

      <div className="flex-1 flex overflow-hidden">
        <ChatList
          chats={mockChats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />

        {selectedChat ? (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            recipientName={selectedChat.name}
            recipientAvatar={selectedChat.avatar}
            recipientInitials={selectedChat.initials}
            isOnline={selectedChat.isOnline}
            isTyping={false}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">Choose a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
