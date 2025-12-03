import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { SupabaseService } from '../services/supabase.service';

import {
  CreateMessageDto,
  MessageResponseDto,
  ThreadResponseDto,
  MessageListResponseDto,
} from './dto/msg.dto';

@Injectable()
export class MsgService {
  private readonly logger = new Logger(MsgService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async createMessage(
    accessToken: string,
    senderId: string,
    createMessageDto: CreateMessageDto
  ): Promise<MessageResponseDto> {
    // Use user's token to respect RLS policies
    const userSupabase =
      this.supabaseService.createClientWithToken(accessToken);

    const { data, error } = await userSupabase
      .from('messages')
      .insert({
        sender_id: senderId,
        receiver_id: createMessageDto.receiver_id,
        content: createMessageDto.content,
      })
      .select()
      .single();

    if (error) {
      this.logger.error('Error creating message:', error);
      throw new HttpException(
        'Failed to send message',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return data;
  }

  async getThreadMessages(
    accessToken: string,
    userId: string,
    otherUserId: string,
    limit = 50
  ): Promise<MessageListResponseDto> {
    // Use user's token to respect RLS policies
    const userSupabase =
      this.supabaseService.createClientWithToken(accessToken);

    const { data, error, count } = await userSupabase
      .from('messages')
      .select('*', { count: 'exact' })
      .or(
        `and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      this.logger.error('Error fetching messages:', error);
      throw new HttpException(
        'Failed to fetch messages',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return {
      messages: data,
      total: count || 0,
    };
  }

  async getThreads(
    accessToken: string,
    userId: string
  ): Promise<ThreadResponseDto[]> {
    // Use user's token to respect RLS policies
    const userSupabase =
      this.supabaseService.createClientWithToken(accessToken);

    const { data, error } = await userSupabase
      .from('messages')
      .select(
        '*, sender:sender_id(id, full_name, avatar_url), receiver:receiver_id(id, full_name, avatar_url)'
      )
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      this.logger.error('Error fetching threads:', error);
      throw new HttpException(
        'Failed to fetch conversations',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const threadsMap = new Map<string, ThreadResponseDto>();

    for (const message of data) {
      const otherUserId =
        message.sender_id === userId ? message.receiver_id : message.sender_id;
      const otherUser =
        message.sender_id === userId ? message.receiver : message.sender;

      if (!threadsMap.has(otherUserId)) {
        threadsMap.set(otherUserId, {
          other_user_id: otherUserId,
          other_user_name: otherUser?.full_name || 'Unknown',
          other_user_avatar: otherUser?.avatar_url || null,
          last_message: message.content,
          last_message_at: message.created_at,
        });
      }
    }

    return Array.from(threadsMap.values());
  }

  async getUnreadCount(_userId: string): Promise<number> {
    // Simplified - just return 0 for now since we removed is_read
    return 0;
  }
}
