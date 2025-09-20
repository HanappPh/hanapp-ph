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
        className={`flex flex-col max-w-xs lg:max-w-md ${
          message.isCurrentUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`rounded-lg px-4 py-2 ${
            message.isCurrentUser ? 'text-white' : 'bg-gray-100 text-gray-800'
          }`}
          style={{
            backgroundColor: message.isCurrentUser ? '#064283' : undefined,
          }}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
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
