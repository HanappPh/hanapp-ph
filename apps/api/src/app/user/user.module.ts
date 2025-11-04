import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from '../guards/auth.guard';
import { SupabaseService } from '../services/supabase.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    SupabaseService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
