'use client';

import { useState, useEffect } from 'react';

interface DBTReflectionsProps {
  trigger: 'capture' | 'schedule' | 'process' | null;
  onClose: () => void;
}

const dbtPrompts = {
  capture: [
    "What emotion are you noticing right now?",
    "Is this thought coming from your Wise Mind?",
    "What need is this thought expressing?",
    "How can you hold this with compassion?",
    "What would be most skillful right now?"
  ],
  schedule: [
    "Does this time choice align with your values?",
    "Are you honoring your limits with this commitment?",
    "What would make this time meaningful?",
    "Is this coming from a place of self-respect?",
    "How does this support your wellbeing?"
  ],
  process: [
    "What's the kindest way to handle this?",
    "Can you let this go without judgment?",
    "What do you need to feel safe right now?",
    "Is this effective for your values?",
    "How can you accept this moment?"
  ]
};

export default function DBTReflections({ trigger, onClose }: DBTReflectionsProps) {
  const [prompt, setPrompt] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      const prompts = dbtPrompts[trigger];
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      setPrompt(randomPrompt);
      setIsVisible(true);
      
      // Auto-close after 8 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!trigger || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm z-30">
      <div className={`sanctuary-card shadow-lg transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">🤍</div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-sanctuary-primary mb-1">
              Wise Mind Check-in
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              {prompt}
            </p>
            <button
              onClick={handleClose}
              className="text-xs text-gray-500 hover:text-sanctuary-primary transition-colors"
            >
              Thank you, I understand
            </button>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
