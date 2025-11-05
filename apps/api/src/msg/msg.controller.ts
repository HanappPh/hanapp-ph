import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';

import {
  CreateMessageDto,
  MessageResponseDto,
  ThreadResponseDto,
  MessageListResponseDto,
} from './dto/msg.dto';
import { MsgService } from './msg.service';

@ApiTags('Messages')
@Controller('messages')
export class MsgController {
  constructor(private readonly msgService: MsgService) {}

  @Post()
  @ApiOperation({ summary: 'Send a new message' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiHeader({
    name: 'x-user-id',
    description: 'Sender user ID',
    required: true,
  })
  @ApiResponse({ status: 201, type: MessageResponseDto })
  async sendMessage(
    @Headers('authorization') authorization: string,
    @Headers('x-user-id') userId: string,
    @Body() createMessageDto: CreateMessageDto
  ): Promise<MessageResponseDto> {
    const token = authorization?.replace('Bearer ', '');
    return this.msgService.createMessage(token, userId, createMessageDto);
  }

  @Get('threads')
  @ApiOperation({ summary: 'Get all conversation threads for current user' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, type: [ThreadResponseDto] })
  async getThreads(
    @Headers('authorization') authorization: string,
    @Headers('x-user-id') userId: string
  ): Promise<ThreadResponseDto[]> {
    const token = authorization?.replace('Bearer ', '');
    return this.msgService.getThreads(token, userId);
  }

  @Get('threads/:otherUserId')
  @ApiOperation({ summary: 'Get messages in a conversation thread' })
  @ApiParam({ name: 'otherUserId', description: 'Other user ID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiResponse({ status: 200, type: MessageListResponseDto })
  async getThreadMessages(
    @Headers('authorization') authorization: string,
    @Headers('x-user-id') userId: string,
    @Param('otherUserId') otherUserId: string,
    @Query('limit') limit?: number
  ): Promise<MessageListResponseDto> {
    const token = authorization?.replace('Bearer ', '');
    return this.msgService.getThreadMessages(token, userId, otherUserId, limit);
  }
}
