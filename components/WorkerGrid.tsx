import React from 'react';
import { Worker, WorkerRole } from '../types';
import { Clock, Battery, MapPin } from 'lucide-react';

const MOCK_WORKERS: Worker[] = [
  { id: '1', name: '战斗鸡1号', role: WorkerRole.FOREMAN, status: 'active', efficiency: 98, avatar: 'https://picsum.photos/seed/ch1/200/200' },
  { id: '2', name: '挖掘鸡', role: WorkerRole.OPERATOR, status: 'active', efficiency: 85, avatar: 'https://picsum.photos/seed/ch2/200/200' },
  { id: '3', name: '摸鱼鸡', role: WorkerRole.LABORER, status: 'break', efficiency: 40, avatar: 'https://picsum.photos/seed/ch3/200/200' },
  { id: '4', name: '肯德鸡', role: WorkerRole.ENGINEER, status: 'offline', efficiency: 0, avatar: 'https://picsum.photos/seed/ch4/200/200' },
  { id: '5', name: '大力鸡', role: WorkerRole.LABORER, status: 'active', efficiency: 92, avatar: 'https://picsum.photos/seed/ch5/200/200' },
  { id: '6', name: '弱弱鸡', role: WorkerRole.LABORER, status: 'active', efficiency: 60, avatar: 'https://picsum.photos/seed/ch6/200/200' },
];

const WorkerCard: React.FC<{ worker: Worker }> = ({ worker }) => {
  const statusColor = {
    active: 'bg-green-100 text-green-700 border-green-200',
    break: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    offline: 'bg-gray-100 text-gray-500 border-gray-200'
  }[worker.status];

  const statusLabel = {
    active: '搬砖中',
    break: '吃米中',
    offline: '回窝了'
  }[worker.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1 transition-transform duration-300">
      <div className="h-24 bg-gradient-to-r from-orange-300 to-yellow-200 relative">
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold border ${statusColor}`}>
          {statusLabel}
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="relative -mt-12 mb-4 text-center">
          <img 
            src={worker.avatar} 
            alt={worker.name} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto object-cover bg-gray-200"
          />
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">{worker.name}</h3>
          <p className="text-sm text-gray-500">{worker.role}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-2 text-slate-600">
            <Clock size={14} />
            <span>工时: 8h</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-2 text-slate-600">
            <MapPin size={14} />
            <span>区域: A区</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">今日效率</span>
            <span className="font-bold text-gray-700">{worker.efficiency}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-construction-yellow h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${worker.efficiency}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WorkerGrid: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">鸡工名册</h2>
        <button className="bg-construction-black text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90">
          + 招募新鸡
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_WORKERS.map(worker => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </div>
  );
};