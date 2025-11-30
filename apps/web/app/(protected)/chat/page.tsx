'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  ChatList,
  type ChatListItem,
} from '../../../components/chat/chat-list';
import { useMessaging } from '../../../hooks/use-messaging';
import { useAuth } from '../../../lib/hooks/useAuth';

const ChatPage = () => {
  const router = useRouter();
  const { profile, loading: authLoading } = useAuth();
  const userId = profile?.id || '';

  // Fetch real threads from API
  const { threads, isLoading, error, fetchThreads } = useMessaging(userId);

  // Load threads on mount when userId is available
  useEffect(() => {
    if (userId) {
      fetchThreads();
    }
  }, [userId, fetchThreads]);

  // Convert API threads to ChatListItem format
  const chatListItems: ChatListItem[] = threads.map(thread => ({
    id: thread.other_user_id,
    name: thread.other_user_name,
    initials: thread.other_user_name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
    avatar: thread.other_user_avatar || '',
    lastMessage: thread.last_message,
    timestamp: new Date(thread.last_message_at),
    unreadCount: 0,
    isOnline: false,
  }));

  const handleSelectChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to access your messages.
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchThreads()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 overflow-hidden">
      <div className="container mx-auto max-w-7xl py-4">
        <div className="flex overflow-hidden" style={{ height: '600px' }}>
          {/* Chat list - full width on mobile, fixed width on desktop */}
          <div className="w-full md:w-80 bg-white md:border-r border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 overflow-y-auto flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">
                      Loading conversations...
                    </p>
                  </div>
                </div>
              ) : chatListItems.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <p className="mb-2">💬 No conversations yet</p>
                    <p className="text-sm text-gray-400">
                      Send a message to start chatting
                    </p>
                  </div>
                </div>
              ) : (
                <ChatList
                  chats={chatListItems}
                  selectedChatId={undefined}
                  onSelectChat={handleSelectChat}
                />
              )}
            </div>
          </div>

          {/* Empty state - hidden on mobile, visible on desktop */}
          <div className="hidden md:flex flex-1 overflow-hidden">
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
                <p className="text-gray-500">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
