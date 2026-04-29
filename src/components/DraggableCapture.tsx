'use client';

import { useDraggable } from '@dnd-kit/core';
import { Capture, Value, Project } from '@/types';

interface DraggableCaptureProps {
  capture: Capture;
  values: Value[];
  projects: Project[];
}

export default function DraggableCapture({ capture, values, projects }: DraggableCaptureProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `capture-${capture.id}`,
    data: {
      type: 'capture',
      capture,
    },
  });

  const getValueById = (valueId?: string) => {
    return values.find(v => v.id === valueId);
  };

  const getProjectById = (projectId?: string) => {
    return projects.find(p => p.id === projectId);
  };

  const value = getValueById(capture.valueId);
  const project = getProjectById(capture.projectId);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-move ${
        isDragging ? 'shadow-lg' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex-1">
        <p className="text-gray-800">{capture.content}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-gray-500">
            {new Date(capture.createdAt).toLocaleTimeString()}
          </p>
          {value && (
            <span
              className="px-2 py-1 text-xs rounded-full text-white"
              style={{ backgroundColor: value.color }}
            >
              {value.title}
            </span>
          )}
          {project && (
            <span className="px-2 py-1 text-xs bg-gray-200 rounded-full text-gray-700">
              {project.title}
            </span>
          )}
        </div>
      </div>
      <div className="text-gray-400">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </div>
    </div>
  );
}
