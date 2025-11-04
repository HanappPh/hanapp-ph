import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as SupabaseUser } from '@supabase/supabase-js';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SupabaseUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
