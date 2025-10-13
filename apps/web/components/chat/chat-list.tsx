'use client';

import { Avatar, AvatarFallback, AvatarImage, Badge } from '@hanapp-ph/commons';
import { formatDistanceToNow } from 'date-fns';

export interface ChatListItem {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  status?: 'active' | 'away' | 'busy';
}

interface ChatListProps {
  chats: ChatListItem[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
}

export const ChatList = ({
  chats,
  selectedChatId,
  onSelectChat,
}: ChatListProps) => {
  const TimeAgo = ({ date }: { date: Date }) => {
    return (
      <span className="text-xs text-gray-500 ml-2">
        {formatDistanceToNow(date, { addSuffix: false })}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`bg-white rounded-xl shadow-sm border cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedChatId === chat.id
                ? 'border-yellow-400 shadow-md ring-2 ring-yellow-100'
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex items-center p-4">
              <div className="relative mr-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback
                    className="bg-yellow-400 font-semibold"
                    style={{ color: '#0c2c5b' }}
                  >
                    {chat.initials}
                  </AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <TimeAgo date={chat.timestamp} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                      {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
