'use client';

import { useState } from 'react';
import { Value } from '@/types';

interface ValuesManagerProps {
  values: Value[];
  onAddValue: (value: Omit<Value, 'id' | 'createdAt'>) => void;
  onDeleteValue: (valueId: string) => void;
}

export default function ValuesManager({ values, onAddValue, onDeleteValue }: ValuesManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newColor, setNewColor] = useState('#6B7280');

  const predefinedColors = [
    '#6B7280', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAddValue({
        title: newTitle.trim(),
        description: newDescription.trim(),
        color: newColor,
      });
      setNewTitle('');
      setNewDescription('');
      setNewColor('#6B7280');
      setIsAdding(false);
    }
  };

  return (
    <div className="sanctuary-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-sanctuary-primary">Values & Missions</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="sanctuary-button text-sm px-4 py-2"
        >
          {isAdding ? 'Cancel' : 'Add Value'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Value title (e.g., 'Health', 'Growth', 'Connection')"
              className="sanctuary-input"
              autoFocus
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What does this value mean to you?"
              className="sanctuary-input resize-none"
              rows={2}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Color:</span>
              <div className="flex gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewColor(color)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      newColor === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="sanctuary-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Value
            </button>
          </div>
        </form>
      )}

      {values.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">No values defined yet</p>
          <p className="text-sm">Add your core values to guide your time allocation</p>
        </div>
      ) : (
        <div className="space-y-2">
          {values.map((value) => (
            <div
              key={value.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: value.color }}
                />
                <div>
                  <h3 className="font-medium text-gray-800">{value.title}</h3>
                  {value.description && (
                    <p className="text-sm text-gray-600">{value.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDeleteValue(value.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
