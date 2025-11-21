import React from 'react';

const CameraCard: React.FC<{ title: string; src: string; isLive?: boolean }> = ({ title, src, isLive = true }) => (
  <div className="bg-black rounded-xl overflow-hidden relative group">
    <img 
      src={src} 
      alt={title} 
      className="w-full h-64 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
    />
    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20">
      <h3 className="text-white font-mono text-sm">{title}</h3>
    </div>
    {isLive && (
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600/80 px-2 py-1 rounded text-white text-xs font-bold animate-pulse">
        <span className="w-2 h-2 bg-white rounded-full"></span>
        LIVE
      </div>
    )}
    {/* Overlay UI */}
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <div className="flex justify-between items-end">
        <div className="text-green-400 font-mono text-xs">
          SIGNAL: STRONG<br/>
          FPS: 30
        </div>
        <div className="text-white/80 text-xs">
          Chicken-Cam-OS v2.0
        </div>
      </div>
    </div>
  </div>
);

export const CameraFeed: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">实时监控中心</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CameraCard 
          title="CAM-01: 正门入口" 
          src="https://picsum.photos/seed/construction1/600/400" 
        />
        <CameraCard 
          title="CAM-02: 材料堆放区" 
          src="https://picsum.photos/seed/construction2/600/400" 
        />
        <CameraCard 
          title="CAM-03: 高空作业面" 
          src="https://picsum.photos/seed/construction3/600/400" 
        />
        <CameraCard 
          title="CAM-04: 员工休息区" 
          src="https://picsum.photos/seed/chickenrest/600/400" 
        />
      </div>
    </div>
  );
};