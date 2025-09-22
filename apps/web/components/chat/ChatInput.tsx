import { Button, Input } from '@hanapp-ph/commons';
import { Send, Paperclip, Smile } from 'lucide-react';
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput = ({
  onSendMessage,
  placeholder = 'Type a message...',
  disabled = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 flex-shrink-0 h-10 w-10"
          disabled={disabled}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="pr-12 pl-4 py-3 border-gray-300 focus:ring-2 focus:ring-opacity-20 rounded-full h-12 text-sm w-full"
            style={
              {
                '--tw-ring-color': '#064283',
                '--tw-border-color': '#064283',
              } as React.CSSProperties
            }
            onFocus={e => {
              e.target.style.borderColor = '#064283';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#d1d5db';
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 h-8 w-8"
            disabled={disabled}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message.trim() || disabled}
          className="text-white rounded-full flex-shrink-0 h-10 w-10 flex items-center justify-center hover:opacity-90"
          style={{ backgroundColor: '#064283' }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
