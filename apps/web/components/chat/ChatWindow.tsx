import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@hanapp-ph/commons';
import { MoreVertical, ArrowLeft } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { ChatInput } from './ChatInput';
import { ChatMessage, ChatMessageData } from './ChatMessage';
// import { Phone, Video, MoreVertical } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessageData[];
  onSendMessage: (message: string) => void;
  recipientName: string;
  recipientAvatar?: string;
  recipientInitials: string;
  isOnline?: boolean;
  isTyping?: boolean;
  onBackToChatList?: () => void;
}

export const ChatWindow = ({
  messages,
  onSendMessage,
  recipientName,
  recipientAvatar,
  recipientInitials,
  isOnline = false,
  isTyping = false,
  onBackToChatList,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 p-4 min-h-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            {onBackToChatList && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackToChatList}
                className="lg:hidden text-gray-500 hover:text-gray-700 flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            <div className="relative flex-shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={recipientAvatar} alt={recipientName} />
                <AvatarFallback
                  className="bg-yellow-400 font-semibold"
                  style={{ color: '#0c2c5b' }}
                >
                  {recipientInitials}
                </AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">
                {recipientName}
              </h3>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                ></div>
                <p className="text-sm text-gray-500">
                  {isOnline ? (isTyping ? 'Typing...' : 'Active') : 'Offline'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-0">
        <div className="space-y-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-start">
              <Avatar className="h-8 w-8 flex-shrink-0 mr-3">
                <AvatarImage src={recipientAvatar} alt={recipientName} />
                <AvatarFallback
                  className="bg-yellow-400 font-semibold text-sm"
                  style={{ color: '#0c2c5b' }}
                >
                  {recipientInitials}
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-50 text-gray-800 rounded-xl px-4 py-3 border border-gray-100">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0 mt-4">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};
