import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { MsgService } from './msg.service';
import { SupabaseService } from '../app/services/supabase.service';

describe('MsgService', () => {
  let service: MsgService;
  let supabaseService: jest.Mocked<SupabaseService>;
  let mockUserSupabase: any;

  beforeEach(async () => {
    // Mock Supabase client returned by createClientWithToken
    mockUserSupabase = {
      from: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MsgService,
        {
          provide: SupabaseService,
          useValue: {
            createClientWithToken: jest.fn().mockReturnValue(mockUserSupabase),
          },
        },
      ],
    }).compile();

    service = module.get<MsgService>(MsgService);
    supabaseService = module.get(SupabaseService);

    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
  });

  // ===================================
  // createMessage()
  // ===================================
  describe('createMessage', () => {
    it('should insert message and return data on success', async () => {
      const fakeData = { id: '1', content: 'Hello' };

      mockUserSupabase.from.mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: fakeData, error: null }),
      });

      const result = await service.createMessage('token', 'user1', {
        receiver_id: 'user2',
        content: 'Hello',
      });

      expect(result).toEqual(fakeData);
      expect(supabaseService.createClientWithToken).toHaveBeenCalledWith(
        'token'
      );
      expect(mockUserSupabase.from).toHaveBeenCalledWith('messages');
    });

    it('should throw HttpException on insert error', async () => {
      mockUserSupabase.from.mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Insert failed' },
        }),
      });

      await expect(
        service.createMessage('token', 'user1', {
          receiver_id: 'user2',
          content: 'Hello',
        })
      ).rejects.toThrow(HttpException);
    });
  });

  // ===================================
  // getThreadMessages()
  // ===================================
  describe('getThreadMessages', () => {
    it('should return messages and count on success', async () => {
      const fakeMessages = [{ id: '1', content: 'Hi' }];

      mockUserSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: fakeMessages,
          error: null,
          count: 1,
        }),
      });

      const result = await service.getThreadMessages('token', 'u1', 'u2', 10);

      expect(result).toEqual({ messages: fakeMessages, total: 1 });
    });

    it('should throw HttpException on query error', async () => {
      mockUserSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Fetch failed' },
        }),
      });

      await expect(
        service.getThreadMessages('token', 'u1', 'u2')
      ).rejects.toThrow(
        new HttpException(
          'Failed to fetch messages',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
    });
  });

  // ===================================
  // getThreads()
  // ===================================
  describe('getThreads', () => {
    it('should return grouped thread data on success', async () => {
      const fakeMessages = [
        {
          id: '1',
          sender_id: 'u1',
          receiver_id: 'u2',
          content: 'Hi',
          created_at: '2024-01-01',
          sender: { id: 'u1', full_name: 'Alice', avatar_url: 'a.jpg' },
          receiver: { id: 'u2', full_name: 'Bob', avatar_url: 'b.jpg' },
        },
        {
          id: '2',
          sender_id: 'u2',
          receiver_id: 'u1',
          content: 'Hello',
          created_at: '2024-01-02',
          sender: { id: 'u2', full_name: 'Bob', avatar_url: 'b.jpg' },
          receiver: { id: 'u1', full_name: 'Alice', avatar_url: 'a.jpg' },
        },
      ];

      mockUserSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: fakeMessages, error: null }),
      });

      const result = await service.getThreads('token', 'u1');

      expect(result).toEqual([
        {
          other_user_id: 'u2',
          other_user_name: 'Bob',
          other_user_avatar: 'b.jpg',
          last_message: 'Hi',
          last_message_at: '2024-01-01',
        },
      ]);
    });

    it('should throw HttpException on Supabase error', async () => {
      mockUserSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'DB error' },
        }),
      });

      await expect(service.getThreads('token', 'u1')).rejects.toThrow(
        new HttpException(
          'Failed to fetch conversations',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
    });
  });

  // ===================================
  // getUnreadCount()
  // ===================================
  describe('getUnreadCount', () => {
    it('should always return 0', async () => {
      expect(await service.getUnreadCount('u1')).toBe(0);
    });
  });
});
