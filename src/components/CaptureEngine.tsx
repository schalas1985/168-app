'use client';

import { useState, useRef, useEffect } from 'react';
import { Capture, Value, Project } from '@/types';

interface CaptureEngineProps {
  onCapture: (capture: Omit<Capture, 'id' | 'createdAt'>) => void;
  values: Value[];
  projects: Project[];
}

export default function CaptureEngine({ onCapture, values, projects }: CaptureEngineProps) {
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedValueId, setSelectedValueId] = useState<string>('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount for instant capture
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCapture({
        content: content.trim(),
        type: isRecording ? 'voice' : 'text',
        status: 'inbox',
        valueId: selectedValueId || undefined,
        projectId: selectedProjectId || undefined,
      });
      setContent('');
      setSelectedValueId('');
      setSelectedProjectId('');
    }
  };

  const toggleRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      setContent(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
    (window as any).currentRecognition = recognition;
  };

  const stopRecording = () => {
    if ((window as any).currentRecognition) {
      (window as any).currentRecognition.stop();
      (window as any).currentRecognition = null;
    }
    setIsRecording(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4">
      <div className="sanctuary-card shadow-lg">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind? Capture it instantly..."
            className="sanctuary-input text-lg"
          />
          <button
            type="submit"
            disabled={!content.trim()}
            className="sanctuary-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Capture
          </button>
        </form>
        
        <div className="flex gap-4 mt-3 text-sm text-gray-500">
          <span>Press Enter to capture</span>
          <span>•</span>
          <button
            type="button"
            onClick={toggleRecording}
            className={`hover:text-sanctuary-primary ${isRecording ? 'text-red-500' : ''}`}
          >
            {isRecording ? '🔴 Recording...' : '🎤 Voice'}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="hover:text-sanctuary-primary"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </button>
        </div>

        {showAdvanced && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedValueId}
                onChange={(e) => setSelectedValueId(e.target.value)}
                className="sanctuary-input text-sm"
              >
                <option value="">No Value</option>
                {values.map((value) => (
                  <option key={value.id} value={value.id}>
                    {value.title}
                  </option>
                ))}
              </select>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="sanctuary-input text-sm"
              >
                <option value="">No Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
