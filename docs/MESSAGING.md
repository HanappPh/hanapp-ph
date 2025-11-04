# Messaging System Documentation

## Overview

Professional 1-on-1 messaging system built with NestJS backend, Supabase Realtime, and Next.js frontend.

## Architecture

### Backend (NestJS)

**Location:** `apps/api/src/msg/`

**Structure:**

```
apps/api/src/msg/
├── dto/
│   └── msg.dto.ts          # Data Transfer Objects with validation
├── msg.controller.ts       # REST API endpoints
├── msg.service.ts          # Business logic
└── msg.module.ts           # Module configuration
```

**API Base URL:** `http://localhost:3001/api/messages`

### Frontend (Next.js)

**Location:** `apps/web/hooks/use-messaging.ts`

**Custom Hook:** `useMessaging(userId)` - Manages messaging state and Supabase Realtime subscriptions

## API Endpoints

### 1. Send Message

```typescript
POST /api/messages
Headers: { 'x-user-id': string }
Body: {
  receiver_id: string;
  content: string;
  booking_id?: string;
}
Response: MessageResponseDto
```

### 2. Get All Threads

```typescript
GET /api/messages/threads
Headers: { 'x-user-id': string }
Response: ThreadResponseDto[]
```

### 3. Get Thread Messages

```typescript
GET /api/messages/threads/:otherUserId?limit=50
Headers: { 'x-user-id': string }
Response: {
  messages: MessageResponseDto[];
  total: number;
}
```

### 4. Mark Thread as Read

```typescript
PATCH /api/messages/threads/:otherUserId/read
Headers: { 'x-user-id': string }
Response: { success: boolean }
```

### 5. Get Unread Count

```typescript
GET /api/messages/unread/count
Headers: { 'x-user-id': string }
Response: { count: number }
```

## Database Schema

### Messages Table

```sql
CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

**RLS Policies:**

- Users can view messages they sent or received
- Users can send messages
- Users can update messages they received (for marking as read)

**Indexes:**

- `idx_messages_sender_id` - Fast sender lookups
- `idx_messages_receiver_id` - Fast receiver lookups
- `idx_messages_created_at` - Chronological ordering
- `idx_messages_is_read` - Unread message queries

## Supabase Realtime

### Setup

Messages table is enabled for Realtime in the main migration `001_initial_schema.sql`:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

This allows real-time subscriptions to message events (INSERT, UPDATE, DELETE).

### Frontend Integration

The `useMessaging` hook automatically subscribes to:

1. **New Messages** - INSERT events filtered by `receiver_id`

   ```typescript
   filter: `receiver_id=eq.${userId}`;
   ```

2. **Message Updates** - UPDATE events filtered by `sender_id` (read receipts)
   ```typescript
   filter: `sender_id=eq.${userId}`;
   ```

### Real-time Features

- ✅ Instant message delivery
- ✅ Read receipts
- ✅ Unread count updates
- ✅ Thread list updates

## Frontend Usage

### Basic Example

```typescript
import { useMessaging } from '../hooks/use-messaging';

function ChatPage() {
  const userId = 'current-user-id';
  const {
    threads,
    currentThreadMessages,
    isLoading,
    error,
    totalUnread,
    fetchThreads,
    fetchThreadMessages,
    sendMessage,
    markThreadAsRead,
  } = useMessaging(userId);

  // Fetch threads on mount
  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  // Open a conversation
  const openThread = async (otherUserId: string) => {
    await fetchThreadMessages(otherUserId);
    await markThreadAsRead(otherUserId);
  };

  // Send a message
  const handleSend = async (receiverId: string, content: string) => {
    try {
      await sendMessage(receiverId, content);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div>
      {/* Thread List */}
      {threads.map(thread => (
        <div key={thread.other_user_id} onClick={() => openThread(thread.other_user_id)}>
          <h3>{thread.other_user_name}</h3>
          <p>{thread.last_message}</p>
          {thread.unread_count > 0 && <span>{thread.unread_count}</span>}
        </div>
      ))}

      {/* Messages */}
      {currentThreadMessages.map(msg => (
        <div key={msg.id}>
          <p>{msg.content}</p>
          <span>{msg.is_read ? 'Read' : 'Sent'}</span>
        </div>
      ))}
    </div>
  );
}
```

## Environment Variables

### Backend (.env in apps/api)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Frontend (.env.local in apps/web)

````env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
## Database Migrations

### Run Migrations in Supabase Dashboard

**Single Migration File:** All messaging features are included in `001_initial_schema.sql`

1. Go to **SQL Editor** in Supabase Dashboard
2. Create a new query
3. Copy and paste the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run** to execute

The migration includes:
- ✅ Messages table with all required columns
- ✅ Row Level Security policies
- ✅ Performance indexes
- ✅ Realtime enabled (`ALTER PUBLICATION supabase_realtime ADD TABLE messages`)
- ✅ Triggers for `updated_at` column

**Or use Supabase CLI:**
```bash
supabase db push
```bash
supabase db push
````

## Testing with Swagger

1. Start the API: `nx serve api`
2. Open: `http://localhost:3001/api-docs`
3. Find the "Messages" section
4. Test endpoints with your logged-in user ID as `x-user-id` header

**Example - Send message to Randell Fabico (for testing):**

```json
POST /api/messages
Headers: { "x-user-id": "your-logged-in-user-id" }
Body: {
  "receiver_id": "327b33ef-3796-4287-b8f3-d4e1f18d23bd",
  "content": "Hi Randell! This is a test message."
}
```

The message will appear in the `messages` table in Supabase.

## Security Considerations

### Current Implementation (Development)

- ✅ Row Level Security (RLS) enabled
- ✅ RLS policies enforce sender/receiver access
- ⚠️ Using `x-user-id` header (temporary)

### Production Recommendations

1. Replace `x-user-id` with JWT authentication
2. Implement rate limiting for message sending
3. Add content moderation/filtering
4. Enable message encryption for sensitive data
5. Implement message deletion/archiving
6. Add file attachment support with virus scanning

## Performance Optimization

### Current Optimizations

- ✅ Database indexes on sender, receiver, timestamp
- ✅ Pagination support (limit parameter)
- ✅ Efficient queries using Supabase filters
- ✅ Real-time subscriptions only for relevant messages

### Future Optimizations

- [ ] Message caching with Redis
- [ ] Lazy loading for old messages
- [ ] Virtual scrolling for large message lists
- [ ] WebSocket connection pooling
- [ ] Message batching for bulk operations

## Troubleshooting

### Messages not appearing in real-time

1. Check Supabase Realtime is enabled: Dashboard → Settings → API
2. Verify migration `002_messages_realtime.sql` was run
3. Check browser console for WebSocket errors
4. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

### API endpoints returning 500 errors

1. Check Supabase credentials in backend `.env`
2. Verify database migrations were run
3. Check API logs: `nx serve api --verbose`
4. Verify SupabaseService is properly initialized

### TypeScript errors in frontend

1. Ensure `@supabase/supabase-js` is installed: `npm install @supabase/supabase-js`
2. Check `types/supabase.ts` is up to date
3. Run `npm run type-check` in apps/web

## Next Steps

### Integration with Existing Chat UI

Update `apps/web/app/(protected)/chat/page.tsx` and `apps/web/app/(protected)/chat/[threadId]/page.tsx` to use the `useMessaging` hook instead of mock data.

**Example:**

```typescript
// Replace mockChats with:
const { threads, fetchThreads } = useMessaging(currentUserId);

useEffect(() => {
  fetchThreads();
}, [fetchThreads]);
```

### Adding Features

1. **Typing Indicators** - Use Supabase presence
2. **File Attachments** - Use Supabase Storage
3. **Message Reactions** - Add emoji reactions table
4. **Push Notifications** - Integrate Firebase/OneSignal
5. **Search Messages** - Add full-text search with pg_trgm

## Support

For questions or issues:

1. Check API documentation: `http://localhost:3001/api-docs`
2. Review backend logs: `nx serve api`
3. Check Supabase Dashboard logs
4. Review this documentation

---

**Built with ❤️ for HanApp-PH**
