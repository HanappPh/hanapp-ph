import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateServiceRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  expertise?: string;

  @IsOptional()
  rate?: number;

  @IsString()
  @IsOptional()
  modeOfPayment?: string;

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
  @IsIn(['pending', 'approved', 'rejected', 'cancelled'])
  status?: string;
}
