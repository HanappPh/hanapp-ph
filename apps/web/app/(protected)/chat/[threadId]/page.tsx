'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

import {
  ChatList,
  type ChatListItem,
} from '../../../../components/chat/chat-list';
import { ChatMessageData } from '../../../../components/chat/chat-message';
import { ChatWindow } from '../../../../components/chat/chat-window';
import { useMessaging } from '../../../../hooks/use-messaging';
import { useAuth } from '../../../../lib/hooks/useAuth';

const ThreadPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const threadId = params?.threadId as string;

  // Get the name from query params if available
  const nameFromQuery = searchParams.get('name') || '';

  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    threadId || null
  );
  const [newChatUserId, setNewChatUserId] = useState<string | null>(null);
  const [newChatUserName, setNewChatUserName] = useState<string>(
    nameFromQuery || 'User'
  );

  // Get the logged-in user from auth context
  const { profile, loading: authLoading } = useAuth();
  const userId = profile?.id || '';

  // Use the messaging hook with real user ID from auth
  const {
    threads,
    currentThreadMessages,
    isLoading,
    error,
    fetchThreads,
    fetchThreadMessages,
    sendMessage,
  } = useMessaging(userId);

  // Load threads and messages on mount when user is authenticated
  useEffect(() => {
    if (userId) {
      fetchThreads();
    }
  }, [userId, fetchThreads]);

  // Update name when query param changes
  useEffect(() => {
    if (nameFromQuery && nameFromQuery !== newChatUserName) {
      setNewChatUserName(nameFromQuery);
    }
  }, [nameFromQuery, newChatUserName]);

  // Fetch user profile for new chat
  const fetchUserProfile = useCallback(
    async (targetUserId: string) => {
      try {
        // Get the current session from useAuth or directly from supabase
        const {
          data: { session },
        } = await (
          await import('../../../../lib/supabase/client')
        ).supabase.auth.getSession();
        const token = session?.access_token;

        if (!token) {
          return;
        }

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/${targetUserId}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setNewChatUserName(userData.full_name || nameFromQuery || 'User');
        }
      } catch {
        // Silent fail - will use name from query or default
      }
    },
    [nameFromQuery]
  );

  // Load messages when selectedChatId changes OR handle new chat
  useEffect(() => {
    if (userId && selectedChatId) {
      // Check if thread exists in the list
      const threadExists = threads.some(
        thread => thread.other_user_id === selectedChatId
      );

      if (threadExists) {
        // Thread exists, load messages normally
        fetchThreadMessages(selectedChatId);
        setNewChatUserId(null);
      } else if (!isLoading) {
        // Threads loaded but selected chat not found - this is a new conversation
        setNewChatUserId(selectedChatId);

        // Try to fetch user profile for the new chat
        fetchUserProfile(selectedChatId);
      }
    }
  }, [
    userId,
    selectedChatId,
    fetchThreadMessages,
    threads,
    isLoading,
    fetchUserProfile,
  ]);

  // Convert API threads to ChatListItem format for the UI
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

  // Find the selected chat from threads, or create a new one for new conversations
  const selectedChat =
    chatListItems.find(chat => chat.id === selectedChatId) ||
    (newChatUserId
      ? {
          id: newChatUserId,
          name: newChatUserName,
          initials: newChatUserName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2),
          avatar: '',
          lastMessage: '',
          timestamp: new Date(),
          unreadCount: 0,
          isOnline: false,
        }
      : null);

  // Get the other user's name dynamically
  const getOtherUserName = (senderId: string): string => {
    if (senderId === userId) {
      return 'You';
    }
    const thread = threads.find(t => t.other_user_id === selectedChatId);
    return thread?.other_user_name || newChatUserName || 'Other User';
  };

  // Get the other user's initials dynamically
  const getOtherUserInitials = (senderId: string): string => {
    if (senderId === userId) {
      return 'ME';
    }
    const thread = threads.find(t => t.other_user_id === selectedChatId);
    if (thread?.other_user_name) {
      return thread.other_user_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    // For new chats, use the fetched name
    if (newChatUserName && newChatUserName !== 'User') {
      return newChatUserName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return 'OU';
  };

  // Convert API messages to ChatMessageData format for the UI
  const chatMessages: ChatMessageData[] = currentThreadMessages.map(msg => ({
    id: msg.id,
    content: msg.content,
    sender: {
      name: getOtherUserName(msg.sender_id),
      initials: getOtherUserInitials(msg.sender_id),
      avatar: '',
    },
    timestamp: new Date(msg.created_at),
    isCurrentUser: msg.sender_id === userId,
    status: 'delivered' as const,
  }));

  const handleSendMessage = async (content: string) => {
    if (!selectedChatId) {
      return;
    }

    try {
      await sendMessage(selectedChatId, content);

      // If this was a new chat, refresh threads to show it in the list
      if (newChatUserId) {
        await fetchThreads();
        setNewChatUserId(null);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    if (userId) {
      fetchThreadMessages(chatId);
    }
  };

  const handleBack = () => {
    router.push('/chat');
  };

  // Show loading while checking authentication
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

  // Show loading state while fetching threads
  if (isLoading && threads.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversations...</p>
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
            onClick={() => {
              fetchThreads();
              if (selectedChatId) {
                fetchThreadMessages(selectedChatId);
              }
            }}
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
          {/* Chat list - hidden on mobile, visible on desktop */}
          <div className="hidden md:flex md:w-80 bg-white border-r border-gray-200 flex-col overflow-hidden">
            <div className="p-4 overflow-y-auto flex-1">
              {chatListItems.length > 0 ? (
                <ChatList
                  chats={chatListItems}
                  selectedChatId={selectedChatId || ''}
                  onSelectChat={handleSelectChat}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  No conversations yet
                </div>
              )}
            </div>
          </div>

          {/* Chat window - full width on mobile, flex-1 on desktop */}
          <div className="flex-1 overflow-hidden">
            {selectedChat ? (
              <ChatWindow
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                recipientName={selectedChat.name}
                recipientAvatar={selectedChat.avatar}
                recipientInitials={selectedChat.initials}
                isOnline={selectedChat.isOnline}
                isTyping={false}
                onBack={handleBack}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-white">
                <div className="text-center">
                  <p className="text-gray-500 text-lg mb-2">
                    {chatListItems.length === 0
                      ? 'No conversations yet'
                      : 'Select a conversation to start chatting'}
                  </p>
                  {chatListItems.length === 0 && (
                    <p className="text-gray-400 text-sm">
                      Send a message to start chatting
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
