import { IsOptional, IsString, IsIn, IsBoolean } from 'class-validator';

export class UpdateServiceRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  rate?: number;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  contactLink?: string;

  @IsString()
  @IsOptional()
  jobLocation?: string;

  @IsString()
  @IsOptional()
  jobDate?: string;

  @IsString()
  @IsOptional()
  jobTime?: string;

  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  @IsIn([
    'pending',
    'approved',
    'rejected',
    'cancelled',
    'accepted',
    'completed',
  ])
  status?: string;

  @IsBoolean()
  @IsOptional()
  is_provider_finished?: boolean;
}
