'use client';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect, useCallback, useRef } from 'react';

import { supabase } from '../lib/supabase/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

interface Thread {
  other_user_id: string;
  other_user_name: string;
  other_user_avatar: string | null;
  last_message: string;
  last_message_at: string;
}

export function useMessaging(userId: string) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [currentThreadMessages, setCurrentThreadMessages] = useState<Message[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);

  // Get access token helper
  const getAccessToken = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token;
  };

  // Initialize Supabase client
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      supabaseRef.current = createClient(supabaseUrl, supabaseKey);
    }
  }, []);

  // Fetch all conversation threads
  const fetchThreads = useCallback(async () => {
    if (!userId) {
      setError('User ID is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await fetch(`${API_BASE_URL}/api/messages/threads`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-user-id': userId,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch threads');
      }

      const data = await response.json();
      setThreads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Fetch messages for a specific thread
  const fetchThreadMessages = useCallback(
    async (otherUserId: string, limit = 50) => {
      if (!userId) {
        setError('User ID is required');
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
          throw new Error('No access token available');
        }

        const response = await fetch(
          `${API_BASE_URL}/api/messages/threads/${otherUserId}?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'x-user-id': userId,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        setCurrentThreadMessages(data.messages.reverse()); // Reverse to show oldest first
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  // Send a new message
  const sendMessage = useCallback(
    async (receiverId: string, content: string) => {
      if (!userId) {
        const err = new Error('User ID is required');
        setError(err.message);
        throw err;
      }

      try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
          throw new Error('No access token available');
        }

        const response = await fetch(`${API_BASE_URL}/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'x-user-id': userId,
          },
          body: JSON.stringify({
            receiver_id: receiverId,
            content,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const newMessage = await response.json();
        setCurrentThreadMessages(prev => [...prev, newMessage]);
        return newMessage;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        throw err;
      }
    },
    [userId]
  );

  // Subscribe to real-time updates
  useEffect(() => {
    if (!supabaseRef.current || !userId) {
      return;
    }

    const channel = supabaseRef.current
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`,
        },
        payload => {
          const newMessage = payload.new as Message;

          // Add to current thread if viewing that conversation
          setCurrentThreadMessages(prev => {
            const isCurrentThread =
              prev.length > 0 &&
              (prev[0].sender_id === newMessage.sender_id ||
                prev[0].receiver_id === newMessage.sender_id);
            return isCurrentThread ? [...prev, newMessage] : prev;
          });

          // Update threads list
          fetchThreads();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${userId}`,
        },
        payload => {
          const updatedMessage = payload.new as Message;

          // Update message in current thread (for messages we send)
          setCurrentThreadMessages(prev =>
            prev.map(msg =>
              msg.id === updatedMessage.id ? updatedMessage : msg
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabaseRef.current?.removeChannel(channel);
    };
  }, [userId, fetchThreads]);

  return {
    threads,
    currentThreadMessages,
    isLoading,
    error,
    fetchThreads,
    fetchThreadMessages,
    sendMessage,
  };
}
