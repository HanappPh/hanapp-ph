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
  const [showChatList, setShowChatList] = useState<boolean>(false);

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

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    // on mobile hide chat list after selection
    setShowChatList(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <NavigationHeader activeTab="chat" />

      <div className="flex-1 flex overflow-hidden relative">
        {showChatList && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowChatList(false)}
          />
        )}

        <div
          className={`
          ${showChatList ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative
          top-0 left-0
          h-full w-80 max-w-[85vw]
          bg-white lg:bg-gray-50
          z-50 lg:z-auto
          transition-transform duration-300 ease-in-out
          lg:transition-none
          shadow-xl lg:shadow-none
        `}
        >
          <ChatList
            chats={mockChats}
            selectedChatId={selectedChatId}
            onSelectChat={handleSelectChat}
            onClose={() => setShowChatList(false)}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {selectedChat ? (
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              recipientName={selectedChat.name}
              recipientAvatar={selectedChat.avatar}
              recipientInitials={selectedChat.initials}
              isOnline={selectedChat.isOnline}
              isTyping={false}
              onBackToChatList={() => setShowChatList(true)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500 mb-4">
                  Choose a chat to start messaging
                </p>
                <button
                  onClick={() => setShowChatList(true)}
                  className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Messages
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
