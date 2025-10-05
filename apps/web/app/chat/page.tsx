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
      <ChatList
        chats={mockChats}
        selectedChatId={undefined}
        onSelectChat={() => router.push(`/chat/[threadId]`)}
        fullWidth
      />
    </div>
  );
};

export default ChatPage;
