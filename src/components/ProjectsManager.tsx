'use client';

import { useState } from 'react';
import { Project, Value } from '@/types';

interface ProjectsManagerProps {
  projects: Project[];
  values: Value[];
  onAddProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  onDeleteProject: (projectId: string) => void;
}

export default function ProjectsManager({ projects, values, onAddProject, onDeleteProject }: ProjectsManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<Project['type']>('project');
  const [newValueId, setNewValueId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAddProject({
        title: newTitle.trim(),
        description: newDescription.trim(),
        type: newType,
        valueId: newValueId || undefined,
      });
      setNewTitle('');
      setNewDescription('');
      setNewType('project');
      setNewValueId('');
      setIsAdding(false);
    }
  };

  const getProjectsByType = (type: Project['type']) => {
    return projects.filter(p => p.type === type);
  };

  const getValueById = (valueId?: string) => {
    return values.find(v => v.id === valueId);
  };

  return (
    <div className="sanctuary-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-sanctuary-primary">Projects & Areas (PARA)</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="sanctuary-button text-sm px-4 py-2"
        >
          {isAdding ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Project/Area title"
              className="sanctuary-input"
              autoFocus
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description or goals"
              className="sanctuary-input resize-none"
              rows={2}
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as Project['type'])}
                className="sanctuary-input"
              >
                <option value="project">Project</option>
                <option value="area">Area</option>
                <option value="resource">Resource</option>
                <option value="archive">Archive</option>
              </select>
              <select
                value={newValueId}
                onChange={(e) => setNewValueId(e.target.value)}
                className="sanctuary-input"
              >
                <option value="">No Value</option>
                {values.map((value) => (
                  <option key={value.id} value={value.id}>
                    {value.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="sanctuary-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Project
            </button>
          </div>
        </form>
      )}

      {(['project', 'area', 'resource', 'archive'] as const).map((type) => {
        const typeProjects = getProjectsByType(type);
        if (typeProjects.length === 0) return null;

        return (
          <div key={type} className="mb-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2 capitalize">
              {type}s ({typeProjects.length})
            </h3>
            <div className="space-y-2">
              {typeProjects.map((project) => {
                const value = getValueById(project.valueId);
                return (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {value && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: value.color }}
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-800">{project.title}</h3>
                        {project.description && (
                          <p className="text-sm text-gray-600">{project.description}</p>
                        )}
                        {value && (
                          <p className="text-xs text-gray-500">Value: {value.title}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">No projects or areas defined yet</p>
          <p className="text-sm">Organize your work with the PARA system</p>
        </div>
      )}
    </div>
  );
}
