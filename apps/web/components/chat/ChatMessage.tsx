import { Avatar, AvatarFallback, AvatarImage } from '@hanapp-ph/commons';
import { formatDistanceToNow } from 'date-fns';

export interface ChatMessageData {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: Date;
  isCurrentUser: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatMessageProps {
  message: ChatMessageData;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start mb-4 ${
        message.isCurrentUser ? 'flex-row-reverse' : ''
      }`}
    >
      <Avatar className="h-8 w-8 flex-shrink-0 mx-2">
        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
        <AvatarFallback
          className="bg-yellow-400 font-semibold text-sm"
          style={{ color: '#0c2c5b' }}
        >
          {message.sender.initials}
        </AvatarFallback>
      </Avatar>

      <div
        className={`flex flex-col max-w-[75%] sm:max-w-xs lg:max-w-md ${
          message.isCurrentUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`rounded-xl px-3 py-2 lg:px-4 lg:py-3 shadow-sm border ${
            message.isCurrentUser
              ? 'text-white border-blue-600'
              : 'bg-gray-50 text-gray-800 border-gray-200'
          }`}
          style={{
            backgroundColor: message.isCurrentUser ? '#064283' : undefined,
          }}
        >
          <p className="text-sm leading-relaxed break-words">
            {message.content}
          </p>
        </div>

        <div
          className={`flex items-center mt-1 ${
            message.isCurrentUser ? 'flex-row-reverse' : ''
          }`}
        >
          {message.isCurrentUser && message.status && (
            <span className="text-xs text-gray-500 ml-1">{message.status}</span>
          )}
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};
