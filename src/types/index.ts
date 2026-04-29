export interface Capture {
  id: string;
  content: string;
  type: 'text' | 'voice' | 'image';
  status: 'inbox' | 'processed' | 'archived';
  createdAt: Date;
  processedAt?: Date;
  valueId?: string;
  projectId?: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
  color: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'area' | 'resource' | 'archive';
  valueId?: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  captureId?: string;
  title: string;
  startTime: Date;
  endTime: Date;
  valueId?: string;
  projectId?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}
