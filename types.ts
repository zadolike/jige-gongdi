export enum WorkerRole {
  FOREMAN = '工头',
  OPERATOR = '操作员',
  LABORER = '搬砖鸡',
  ENGINEER = '工程师'
}

export interface Worker {
  id: string;
  name: string;
  role: WorkerRole;
  status: 'active' | 'break' | 'offline';
  efficiency: number; // 0-100
  avatar: string;
}

export interface SiteMetric {
  label: string;
  value: string | number;
  change: number; // percentage
  unit: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  WORKERS = 'workers',
  CAMERAS = 'cameras',
  AI_FOREMAN = 'ai_foreman'
}