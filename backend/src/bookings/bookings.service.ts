import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Booking, BookingStatus } from './interfaces/booking.interface';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [];

  create(dto: CreateBookingDto): Booking {
    const existing = this.bookings.find(
      (b) =>
        b.date.startsWith(dto.date) &&
        b.clientName === dto.name &&
        b.pickup === dto.pickup &&
        b.destination === dto.destination,
    );
    if (existing) {
      const age = Date.now() - new Date(existing.createdAt).getTime();
      if (age < 5000) {
        throw new ConflictException('Duplicate booking detected');
      }
    }

    const now = new Date().toISOString();
    const booking: Booking = {
      id: uuidv4(),
      clientName: dto.name,
      email: dto.email,
      phone: dto.phone,
      service: dto.service,
      pickup: dto.pickup,
      destination: dto.destination,
      date: `${dto.date}T${dto.time}:00.000Z`,
      status: 'pending' as BookingStatus,
      company: dto.company,
      passengers: dto.passengers,
      meetAndGreet: dto.meetAndGreet === 'yes',
      notes: dto.notes,
      createdAt: now,
      updatedAt: now,
    };

    this.bookings.push(booking);
    return booking;
  }

  findAll(search?: string, status?: string): Booking[] {
    let items = this.bookings;

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (b) =>
          b.clientName.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q) ||
          b.pickup.toLowerCase().includes(q) ||
          b.destination.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q),
      );
    }

    if (status) {
      items = items.filter((b) => b.status === status);
    }

    return items;
  }

  findOne(id: string): Booking {
    const booking = this.bookings.find((b) => b.id === id);
    if (!booking) {
      throw new NotFoundException(`Booking with id '${id}' not found`);
    }
    return booking;
  }

  updateStatus(id: string, dto: UpdateBookingStatusDto): Booking {
    const booking = this.findOne(id);
    booking.status = dto.status;
    booking.updatedAt = new Date().toISOString();
    return booking;
  }
}
