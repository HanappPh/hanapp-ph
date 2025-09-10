import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  email!: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  name!: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    minLength: 6,
  })
  password!: string;
}

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  id!: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  email!: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  name!: string;

  @ApiProperty({
    example: '2025-09-10T14:30:45.123Z',
    description: 'User creation date',
  })
  createdAt!: string;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'Jane Doe',
    description: 'User full name',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
    description: 'User email address',
    required: false,
  })
  email?: string;
}
