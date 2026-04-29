'use client';

import { Capture, Value, Project } from '@/types';
import DraggableCapture from './DraggableCapture';

interface CaptureInboxProps {
  captures: Capture[];
  values: Value[];
  projects: Project[];
  onProcess: (captureId: string) => void;
  onDelete: (captureId: string) => void;
}

export default function CaptureInbox({ captures, values, projects, onProcess, onDelete }: CaptureInboxProps) {
  const inboxCaptures = captures.filter(c => c.status === 'inbox');

  const getValueById = (valueId?: string) => {
    return values.find(v => v.id === valueId);
  };

  const getProjectById = (projectId?: string) => {
    return projects.find(p => p.id === projectId);
  };

  return (
    <div className="sanctuary-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-sanctuary-primary">Capture Inbox</h2>
        <span className="text-sm text-gray-500">{inboxCaptures.length} items</span>
      </div>
      
      {inboxCaptures.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">Your inbox is empty</p>
          <p className="text-sm">Start capturing thoughts above!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {inboxCaptures.map((capture) => (
            <div key={capture.id} className="flex gap-2">
              <DraggableCapture
                capture={capture}
                values={values}
                projects={projects}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => onProcess(capture.id)}
                  className="px-3 py-1 text-sm bg-sanctuary-primary text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Process
                </button>
                <button
                  onClick={() => onDelete(capture.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
