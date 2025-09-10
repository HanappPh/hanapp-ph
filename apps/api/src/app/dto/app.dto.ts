import { ApiProperty } from '@nestjs/swagger';

export class AppDataResponseDto {
  @ApiProperty({
    example: 'Hello API',
    description: 'Welcome message from the API',
  })
  message!: string;
}

export class HealthResponseDto {
  @ApiProperty({
    example: 'ok',
    description: 'Health status of the API',
  })
  status!: string;

  @ApiProperty({
    example: '2025-09-10T14:30:45.123Z',
    description: 'Current server timestamp',
  })
  timestamp!: string;

  @ApiProperty({
    example: 3600.5,
    description: 'Server uptime in seconds',
  })
  uptime!: number;
}
