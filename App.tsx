import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { WorkerGrid } from './components/WorkerGrid';
import { AIForeman } from './components/AIForeman';
import { CameraFeed } from './components/CameraFeed';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <DashboardStats />;
      case ViewState.WORKERS:
        return <WorkerGrid />;
      case ViewState.AI_FOREMAN:
        return <AIForeman />;
      case ViewState.CAMERAS:
        return <CameraFeed />;
      default:
        return <DashboardStats />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: return '仪表盘';
      case ViewState.WORKERS: return '员工管理';
      case ViewState.AI_FOREMAN: return 'AI 助手';
      case ViewState.CAMERAS: return '视频监控';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        isMobileOpen={mobileMenuOpen}
        toggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800">{getTitle()}</h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end">
               <span className="text-xs text-gray-500">当前天气</span>
               <span className="text-sm font-medium text-gray-800">☀️ 晴 28°C</span>
             </div>
             <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold border border-orange-200">
               J
             </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;