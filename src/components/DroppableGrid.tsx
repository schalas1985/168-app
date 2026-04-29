'use client';

import { useDroppable } from '@dnd-kit/core';
import { Booking, Value, Project, Capture } from '@/types';

interface DroppableGridProps {
  day: number;
  hour: number;
  bookings: Booking[];
  values: Value[];
  projects: Project[];
  onDrop: (day: number, hour: number, capture: Capture) => void;
  onAddBooking: (day: number, hour: number) => void;
}

export default function DroppableGrid({ day, hour, bookings, values, projects, onDrop, onAddBooking }: DroppableGridProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `grid-${day}-${hour}`,
    data: {
      day,
      hour,
    },
  });

  const getBookingsForDayHour = () => {
    return bookings.filter(booking => {
      const bookingStart = new Date(booking.startTime);
      return bookingStart.getDay() === day && bookingStart.getHours() === hour;
    });
  };

  const hourBookings = getBookingsForDayHour();
  const hasBooking = hourBookings.length > 0;

  const handleClick = () => {
    if (!hasBooking && !isOver) {
      onAddBooking(day, hour);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`border border-gray-200 rounded p-1 min-h-[40px] cursor-pointer transition-colors ${
        isOver 
          ? 'bg-sanctuary-primary/30 border-sanctuary-primary' 
          : hasBooking 
            ? 'bg-sanctuary-primary/20 border-sanctuary-primary' 
            : 'hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      {hasBooking && (
        <div className="text-xs p-1 bg-sanctuary-primary text-white rounded">
          {hourBookings[0].title}
        </div>
      )}
      {isOver && (
        <div className="text-xs p-1 bg-sanctuary-primary text-white rounded text-center">
          Drop here
        </div>
      )}
    </div>
  );
}
