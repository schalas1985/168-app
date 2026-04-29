'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import CaptureEngine from '@/components/CaptureEngine';
import CaptureInbox from '@/components/CaptureInbox';
import WeeklyGrid from '@/components/WeeklyGrid';
import ValuesManager from '@/components/ValuesManager';
import ProjectsManager from '@/components/ProjectsManager';
import DBTReflections from '@/components/DBTReflections';
import { Capture, Booking, Value, Project } from '@/types';

export default function Home() {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [values, setValues] = useState<Value[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'values' | 'projects'>('dashboard');
  const [dbtTrigger, setDbtTrigger] = useState<'capture' | 'schedule' | 'process' | null>(null);

  const handleCapture = (capture: Omit<Capture, 'id' | 'createdAt'>) => {
    const newCapture: Capture = {
      ...capture,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setCaptures(prev => [newCapture, ...prev]);
    
    // Trigger DBT reflection for captures
    if (Math.random() > 0.7) { // 30% chance to show reflection
      setDbtTrigger('capture');
    }
  };

  const handleProcessCapture = (captureId: string) => {
    setCaptures(prev => prev.map(c => 
      c.id === captureId ? { ...c, status: 'processed' as const } : c
    ));
    
    // Trigger DBT reflection for processing
    if (Math.random() > 0.5) { // 50% chance to show reflection
      setDbtTrigger('process');
    }
  };

  const handleDeleteCapture = (captureId: string) => {
    setCaptures(prev => prev.filter(c => c.id !== captureId));
  };

  const handleAddBooking = (startTime: Date, endTime: Date) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      startTime,
      endTime,
      title: 'New Booking',
      status: 'scheduled',
    };
    setBookings(prev => [...prev, newBooking]);
    
    // Trigger DBT reflection for scheduling
    if (Math.random() > 0.6) { // 40% chance to show reflection
      setDbtTrigger('schedule');
    }
  };

  const handleDropCapture = (day: number, hour: number, capture: Capture) => {
    const startTime = new Date();
    const currentDay = startTime.getDay();
    const dayDiff = day - currentDay;
    startTime.setDate(startTime.getDate() + dayDiff);
    startTime.setHours(hour, 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(hour + 1);
    
    const newBooking: Booking = {
      id: Date.now().toString(),
      captureId: capture.id,
      startTime,
      endTime,
      title: capture.content,
      status: 'scheduled',
      valueId: capture.valueId,
      projectId: capture.projectId,
    };
    
    setBookings(prev => [...prev, newBooking]);
    setCaptures(prev => prev.map(c => 
      c.id === capture.id ? { ...c, status: 'processed' as const } : c
    ));
    
    // Trigger DBT reflection for scheduling
    if (Math.random() > 0.4) { // 60% chance to show reflection
      setDbtTrigger('schedule');
    }
  };

  const handleAddValue = (value: Omit<Value, 'id' | 'createdAt'>) => {
    const newValue: Value = {
      ...value,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setValues(prev => [...prev, newValue]);
  };

  const handleDeleteValue = (valueId: string) => {
    setValues(prev => prev.filter(v => v.id !== valueId));
  };

  const handleAddProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const draggedData = active.data.current;
    const dropData = over.data.current;

    if (draggedData?.type === 'capture' && dropData?.day !== undefined && dropData?.hour !== undefined) {
      handleDropCapture(dropData.day, dropData.hour, draggedData.capture);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="min-h-screen bg-gradient-to-br from-sanctuary-secondary to-sanctuary-calm">
      <CaptureEngine 
        onCapture={handleCapture} 
        values={values}
        projects={projects}
      />
      
      <DBTReflections 
        trigger={dbtTrigger} 
        onClose={() => setDbtTrigger(null)} 
      />
      
      <div className="sanctuary-container pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-sanctuary-primary mb-2">
            The Sanctuary
          </h1>
          <p className="text-gray-600">
            Your safe container for meaningful time management
          </p>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-sanctuary-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'values' 
                  ? 'bg-sanctuary-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Values & Missions
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-sanctuary-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Projects & Areas
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <CaptureInbox
                captures={captures}
                values={values}
                projects={projects}
                onProcess={handleProcessCapture}
                onDelete={handleDeleteCapture}
              />
              
              <div className="sanctuary-card">
                <h3 className="text-lg font-medium text-sanctuary-primary mb-3">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Captures Today</p>
                    <p className="text-2xl font-medium text-sanctuary-primary">
                      {captures.filter(c => 
                        c.createdAt.toDateString() === new Date().toDateString()
                      ).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Hours Scheduled</p>
                    <p className="text-2xl font-medium text-sanctuary-primary">
                      {bookings.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Active Values</p>
                    <p className="text-2xl font-medium text-sanctuary-primary">
                      {values.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Projects</p>
                    <p className="text-2xl font-medium text-sanctuary-primary">
                      {projects.filter(p => p.type === 'project').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <WeeklyGrid
                bookings={bookings}
                values={values}
                projects={projects}
                onAddBooking={handleAddBooking}
                onDropCapture={handleDropCapture}
              />
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <ValuesManager
            values={values}
            onAddValue={handleAddValue}
            onDeleteValue={handleDeleteValue}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsManager
            projects={projects}
            values={values}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
          />
        )}
      </div>
    </main>
    </DndContext>
  );
}
