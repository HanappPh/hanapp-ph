export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          user_type: 'client' | 'provider' | 'both' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          user_type?: 'client' | 'provider' | 'both' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          user_type?: 'client' | 'provider' | 'both' | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          provider_id: string | null;
          category_id: string | null;
          title: string;
          description: string | null;
          price_from: number | null;
          price_to: number | null;
          currency: string;
          availability_schedule: string | null;
          service_areas: string[] | null;
          rating: number;
          total_reviews: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider_id?: string | null;
          category_id?: string | null;
          title: string;
          description?: string | null;
          price_from?: number | null;
          price_to?: number | null;
          currency?: string;
          availability_schedule?: string | null;
          service_areas?: string[] | null;
          rating?: number;
          total_reviews?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string | null;
          category_id?: string | null;
          title?: string;
          description?: string | null;
          price_from?: number | null;
          price_to?: number | null;
          currency?: string;
          availability_schedule?: string | null;
          service_areas?: string[] | null;
          rating?: number;
          total_reviews?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          service_id: string | null;
          client_id: string | null;
          provider_id: string | null;
          status:
            | 'pending'
            | 'confirmed'
            | 'in_progress'
            | 'completed'
            | 'cancelled';
          scheduled_date: string | null;
          total_price: number | null;
          currency: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          service_id?: string | null;
          client_id?: string | null;
          provider_id?: string | null;
          status?:
            | 'pending'
            | 'confirmed'
            | 'in_progress'
            | 'completed'
            | 'cancelled';
          scheduled_date?: string | null;
          total_price?: number | null;
          currency?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string | null;
          client_id?: string | null;
          provider_id?: string | null;
          status?:
            | 'pending'
            | 'confirmed'
            | 'in_progress'
            | 'completed'
            | 'cancelled';
          scheduled_date?: string | null;
          total_price?: number | null;
          currency?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string | null;
          service_id: string | null;
          client_id: string | null;
          provider_id: string | null;
          rating: number | null;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id?: string | null;
          service_id?: string | null;
          client_id?: string | null;
          provider_id?: string | null;
          rating?: number | null;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string | null;
          service_id?: string | null;
          client_id?: string | null;
          provider_id?: string | null;
          rating?: number | null;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string | null;
          receiver_id: string | null;
          booking_id: string | null;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id?: string | null;
          receiver_id?: string | null;
          booking_id?: string | null;
          content: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string | null;
          receiver_id?: string | null;
          booking_id?: string | null;
          content?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
