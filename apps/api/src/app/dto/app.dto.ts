import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO for application data endpoint
 */
export class AppDataResponseDto {
  @ApiProperty({
    description: 'Message from the API',
    example: 'Hello API',
  })
  message!: string;
}

/**
 * Response DTO for health check endpoint
 */
export class HealthResponseDto {
  @ApiProperty({
    description: 'Health status of the API',
    example: 'OK',
  })
  status!: string;

  @ApiProperty({
    description: 'Timestamp of the health check',
    example: '2025-10-28T12:00:00.000Z',
  })
  timestamp!: string;

  @ApiProperty({
    description: 'Uptime of the API in seconds',
    example: 12345,
  })
  uptime!: number;
}
