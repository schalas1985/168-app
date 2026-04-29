'use client';

import { useState } from 'react';
import { Booking, Value, Project, Capture } from '@/types';
import DroppableGrid from './DroppableGrid';

interface WeeklyGridProps {
  bookings: Booking[];
  values: Value[];
  projects: Project[];
  onAddBooking: (startTime: Date, endTime: Date) => void;
  onDropCapture: (day: number, hour: number, capture: Capture) => void;
}

export default function WeeklyGrid({ bookings, values, projects, onAddBooking, onDropCapture }: WeeklyGridProps) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleAddBooking = (day: number, hour: number) => {
    const startTime = new Date();
    const currentDay = startTime.getDay();
    const dayDiff = day - currentDay;
    startTime.setDate(startTime.getDate() + dayDiff);
    startTime.setHours(hour, 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(hour + 1);
    
    onAddBooking(startTime, endTime);
  };

  return (
    <div className="sanctuary-card">
        <div className="mb-4">
          <h2 className="text-xl font-medium text-sanctuary-primary mb-2">168-Hour Weekly Grid</h2>
          <p className="text-sm text-gray-600">Drag captures here or click to schedule time</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="text-xs font-medium text-gray-600">Hour</div>
              {days.map((day, index) => (
                <div
                  key={day}
                  className={`text-center text-xs font-medium cursor-pointer p-2 rounded ${
                    selectedDay === index ? 'bg-sanctuary-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedDay(index)}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
                <div className="text-xs text-gray-600 p-2">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                {days.map((day, dayIndex) => (
                  <DroppableGrid
                    key={`${day}-${hour}`}
                    day={dayIndex}
                    hour={hour}
                    bookings={bookings}
                    values={values}
                    projects={projects}
                    onDrop={onDropCapture}
                    onAddBooking={handleAddBooking}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>Total hours this week: 168</p>
          <p>Scheduled: {bookings.length} hours</p>
          <p>Available: {168 - bookings.length} hours</p>
        </div>
      </div>
  );
}
