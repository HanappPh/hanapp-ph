export type UserType = 'client' | 'provider' | 'both';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: UserType;
  phone_verified?: boolean;
  avatar_url?: string;
  created_at?: string;
}
