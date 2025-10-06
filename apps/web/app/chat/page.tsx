'use client';

import { useRouter } from 'next/navigation';

import { ChatList, type ChatListItem } from '../../components/chat/ChatList';

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

const ChatPage = () => {
  const router = useRouter();

  return (
    <div className="h-screen bg-gray-50 flex">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <ChatList
          chats={mockChats}
          selectedChatId={undefined}
          onSelectChat={() => router.push('/chat/[threadId]')}
          fullWidth={false}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your messages
            </h3>
            <p className="text-gray-500">Send a message to start a chat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
