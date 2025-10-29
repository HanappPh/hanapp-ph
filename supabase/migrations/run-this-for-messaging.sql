-- ============================================
-- SIMPLE MESSAGING SYSTEM - RUN THIS IN SUPABASE SQL EDITOR
-- ============================================
-- Just the basics: send messages from one user to another

-- Messages table (simple chat functionality)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies (simple - users can view and send messages)
-- Using DO block to create policies only if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' 
    AND policyname = 'Users can view their own messages'
  ) THEN
    CREATE POLICY "Users can view their own messages" 
      ON public.messages FOR SELECT 
      USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' 
    AND policyname = 'Users can send messages'
  ) THEN
    CREATE POLICY "Users can send messages" 
      ON public.messages FOR INSERT 
      WITH CHECK (auth.uid() = sender_id);
  END IF;
END $$;

-- Basic indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- Enable Realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
