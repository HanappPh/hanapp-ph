import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { SupabaseService } from '../services/supabase.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';

// Helper to create a chainable mock for supabase queries
const makeChain = (response: any) => ({
  from: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue(response),
  order: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
});

describe('ServiceRequestService', () => {
  let service: ServiceRequestService;

  // Mock SupabaseService
  const mockSupabaseService: any = {
    getClient: jest.fn(),
    createUserClient: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceRequestService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
      ],
    }).compile();

    service = module.get<ServiceRequestService>(ServiceRequestService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('creates a service request using public client', async () => {
      const created = { id: 'sr1', title: 'Test' };
      const chain = makeChain({ data: created, error: null });
      mockSupabaseService.getClient.mockReturnValue(chain);

      const dto = new CreateServiceRequestDto();
      dto.categoryId = 1;
      dto.title = 'Test';
      dto.description = 'desc';
      dto.rate = 100;
      dto.contact = '+639123456789';
      dto.contactLink = '';
      dto.jobLocation = 'Manila';
      dto.jobDate = '2025-11-05';
      dto.jobTime = '10:00';
      dto.jobTime2 = '11:00';
      dto.images = [];

      const result = await service.create(dto, 'client1');
      expect(result).toEqual(created);

      expect(mockSupabaseService.getClient).toHaveBeenCalled();
      expect(chain.insert).toHaveBeenCalled();
    });

    it('throws if insert returns error', async () => {
      const chain = makeChain({ data: null, error: { message: 'boom' } });
      mockSupabaseService.getClient.mockReturnValue(chain);

      const dto = new CreateServiceRequestDto();
      dto.categoryId = 1;
      dto.title = 'Test';
      dto.description = 'desc';
      dto.rate = 100;
      dto.contact = '+639123456789';
      dto.contactLink = '';
      dto.jobLocation = 'Manila';
      dto.jobDate = '2025-11-05';
      dto.jobTime = '10:00';
      dto.jobTime2 = '11:00';
      dto.images = [];

      await expect(service.create(dto, 'client1')).rejects.toThrow(
        new HttpException(
          'Failed to create service request: boom',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
    });
  });

  describe('findAll', () => {
    it('returns service requests with attached users', async () => {
      const sr = [{ id: 'sr1', client_id: 'u1' }];
      const users = [{ id: 'u1', full_name: 'User One' }];
      // Build a client whose from(...).select(...).order(...) returns a Promise resolving to {data: sr}
      const client = {
        from: jest.fn((table: string) => {
          if (table === 'service_requests') {
            return {
              select: jest.fn(() => ({
                order: jest.fn(() =>
                  Promise.resolve({ data: sr, error: null })
                ),
              })),
            } as any;
          }

          if (table === 'users') {
            return {
              select: jest.fn(() => ({
                in: jest.fn(() =>
                  Promise.resolve({ data: users, error: null })
                ),
              })),
            } as any;
          }

          return makeChain({ data: null, error: null });
        }),
      };

      mockSupabaseService.getClient.mockReturnValue(client);

      const result = await service.findAll();
      expect(result).toEqual([
        expect.objectContaining({
          id: 'sr1',
          users: expect.objectContaining({ full_name: 'User One' }),
        }),
      ]);
    });

    it('throws when fetch fails', async () => {
      const client = {
        from: jest.fn(() => ({
          select: jest.fn(() => ({
            order: jest.fn(() =>
              Promise.resolve({ data: null, error: { message: 'bad' } })
            ),
          })),
        })),
      } as any;
      mockSupabaseService.getClient.mockReturnValue(client);

      await expect(service.findAll()).rejects.toThrow(
        new HttpException(
          'Failed to fetch service requests: bad',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
    });
  });

  describe('findOne', () => {
    it('returns combined user data when found', async () => {
      const sr = { id: 'sr1', client_id: 'u1', title: 'T' };
      const profile = {
        full_name: 'Profile Name',
        email: 'p@x',
        phone: '0917',
        avatar_url: 'a',
        created_at: 'date',
      };
      const user = {
        full_name: 'User Name',
        email: 'u@x',
        created_at: 'date2',
      };

      const client = {
        from: jest.fn((table: string) => {
          if (table === 'service_requests') {
            return {
              select: jest.fn(() => ({
                eq: jest.fn(() => ({
                  single: jest.fn(() =>
                    Promise.resolve({ data: sr, error: null })
                  ),
                })),
              })),
            } as any;
          }

          if (table === 'profiles') {
            return {
              select: jest.fn(() => ({
                eq: jest.fn(() => ({
                  single: jest.fn(() =>
                    Promise.resolve({ data: profile, error: null })
                  ),
                })),
              })),
            } as any;
          }

          if (table === 'users') {
            return {
              select: jest.fn(() => ({
                eq: jest.fn(() => ({
                  single: jest.fn(() =>
                    Promise.resolve({ data: user, error: null })
                  ),
                })),
              })),
            } as any;
          }

          return makeChain({ data: null, error: null });
        }),
      };

      mockSupabaseService.getClient.mockReturnValue(client);

      const result = await service.findOne('sr1');
      expect(result).toHaveProperty('users');
      expect(result.users.full_name).toBe('Profile Name');
      expect(result.id).toBe('sr1');
    });

    it('throws not found when missing', async () => {
      const client = {
        from: jest.fn(() => ({
          select: jest.fn(() => ({
            eq: jest.fn(() => ({
              single: jest.fn(() =>
                Promise.resolve({ data: null, error: { message: 'no' } })
              ),
            })),
          })),
        })),
      } as any;
      mockSupabaseService.getClient.mockReturnValue(client);

      await expect(service.findOne('sr1')).rejects.toThrow(
        new HttpException('Service request not found', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('update', () => {
    it('updates and returns data', async () => {
      const updated = { id: 'sr1', title: 'Updated' };
      const client = {
        from: jest.fn((table: string) => ({
          update: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: updated, error: null }),
        })),
      };
      mockSupabaseService.getClient.mockReturnValue(client);

      const result = await service.update('sr1', { title: 'Updated' } as any);
      expect(result).toEqual(updated);
    });

    it('throws not found when update fails', async () => {
      const client = {
        from: jest.fn((table: string) => ({
          update: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest
            .fn()
            .mockResolvedValue({ data: null, error: { message: 'bad' } }),
        })),
      };
      mockSupabaseService.getClient.mockReturnValue(client);

      await expect(
        service.update('sr1', { title: 'x' } as any)
      ).rejects.toThrow(
        new HttpException('Service request not found', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('remove', () => {
    it('deletes successfully', async () => {
      const client = {
        from: jest.fn((table: string) => ({
          delete: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          then: (cb: any) => cb({ error: null }),
        })),
      };
      // adapt to await pattern
      client.from = jest.fn((table: string) => ({
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        then: (resolve: any) => resolve({ error: null }),
      }));
      mockSupabaseService.getClient.mockReturnValue(client);

      const result = await service.remove('sr1');
      expect(result).toEqual({
        message: 'Service request deleted successfully',
      });
    });

    it('throws when delete fails', async () => {
      const client = {
        from: jest.fn((table: string) => ({
          delete: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          then: (resolve: any) => resolve({ error: { message: 'bad' } }),
        })),
      };
      mockSupabaseService.getClient.mockReturnValue(client);

      await expect(service.remove('sr1')).rejects.toThrow(
        new HttpException('Service request not found', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('findByCategory and findByStatus', () => {
    it('returns data for category', async () => {
      const data = [{ id: 'a' }];
      const client = {
        from: jest.fn((table: string) => ({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          then: (resolve: any) => resolve({ data, error: null }),
        })),
      };
      mockSupabaseService.getClient.mockReturnValue(client);

      const result = await service.findByCategory('cat');
      expect(result).toEqual(data);
    });

    it('returns data for status', async () => {
      const data = [{ id: 'b' }];
      const client = {
        from: jest.fn((table: string) => ({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          then: (resolve: any) => resolve({ data, error: null }),
        })),
      };
      mockSupabaseService.getClient.mockReturnValue(client);

      const result = await service.findByStatus('open');
      expect(result).toEqual(data);
    });
  });

  describe('findPublicJobListings', () => {
    it('combines profiles and users', async () => {
      const serviceRequests = [{ id: 'sr1', client_id: 'u1' }];
      const profiles = [{ id: 'u1', full_name: 'P' }];
      const users = [{ id: 'u1', full_name: 'U' }];

      const client = {
        from: jest.fn((table: string) => {
          if (table === 'service_requests')
            return {
              select: jest.fn().mockReturnThis(),
              order: jest.fn().mockReturnThis(),
              then: (resolve: any) =>
                resolve({ data: serviceRequests, error: null }),
            };
          if (table === 'profiles')
            return {
              select: jest.fn().mockReturnThis(),
              in: jest.fn().mockReturnThis(),
              then: (resolve: any) => resolve({ data: profiles, error: null }),
            };
          if (table === 'users')
            return {
              select: jest.fn().mockReturnThis(),
              in: jest.fn().mockReturnThis(),
              then: (resolve: any) => resolve({ data: users, error: null }),
            };
          return makeChain({ data: null, error: null });
        }),
      };

      mockSupabaseService.getClient.mockReturnValue(client);

      const result = await service.findPublicJobListings();
      expect(result[0].users.full_name).toBe('P');
    });
  });
});
