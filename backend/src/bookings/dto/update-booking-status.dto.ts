import { IsString, IsIn } from 'class-validator';

const validStatuses = ['confirmed', 'pending', 'completed', 'cancelled'] as const;
export type BookingStatus = typeof validStatuses[number];

export class UpdateBookingStatusDto {
  @IsString()
  @IsIn(validStatuses)
  status: BookingStatus;
}
