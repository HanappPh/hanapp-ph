import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@hanapp-ph/commons';
import { MoreVertical } from 'lucide-react';
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
}

export const ChatWindow = ({
  messages,
  onSendMessage,
  recipientName,
  recipientAvatar,
  recipientInitials,
  isOnline = false,
  isTyping = false,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={recipientAvatar} alt={recipientName} />
                <AvatarFallback
                  className="bg-yellow-400 font-semibold"
                  style={{ color: '#0c2c5b' }}
                >
                  {recipientInitials}
                </AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{recipientName}</h3>
              <p className="text-sm text-gray-500">
                {isOnline ? (isTyping ? 'Typing...' : 'Online') : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <Video className="h-4 w-4" />
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-2">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-start mb-4">
              <Avatar className="h-8 w-8 flex-shrink-0 mx-2">
                <AvatarImage src={recipientAvatar} alt={recipientName} />
                <AvatarFallback
                  className="bg-yellow-400 font-semibold text-sm"
                  style={{ color: '#0c2c5b' }}
                >
                  {recipientInitials}
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
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

      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};
