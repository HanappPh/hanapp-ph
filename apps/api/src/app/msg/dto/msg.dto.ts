import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: '327b33ef-3796-4287-b8f3-d4e1f18d23bd',
    description: 'Receiver user ID (e.g., Randell Fabico for testing)',
  })
  @IsUUID()
  @IsNotEmpty()
  receiver_id!: string;

  @ApiProperty({ example: 'Hello! Are you available?' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class MessageResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  sender_id!: string;

  @ApiProperty()
  receiver_id!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  created_at!: string;
}

export class ThreadResponseDto {
  @ApiProperty()
  other_user_id!: string;

  @ApiProperty()
  other_user_name!: string;

  @ApiProperty({ nullable: true })
  other_user_avatar!: string | null;

  @ApiProperty()
  last_message!: string;

  @ApiProperty()
  last_message_at!: string;
}

export class MessageListResponseDto {
  @ApiProperty({ type: [MessageResponseDto] })
  messages!: MessageResponseDto[];

  @ApiProperty()
  total!: number;
}
