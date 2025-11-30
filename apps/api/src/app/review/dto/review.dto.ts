import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  booking_id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  service_listing_id?: string;

  @ApiProperty()
  @IsNumber()
  rating!: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdateReviewDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
