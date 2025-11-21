import React from 'react';
import { LayoutDashboard, HardHat, Cctv, MessageSquare, Construction } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isMobileOpen: boolean;
  toggleMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isMobileOpen, toggleMobile }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, label: '工地概况', icon: LayoutDashboard },
    { id: ViewState.WORKERS, label: '鸡工列表', icon: HardHat },
    { id: ViewState.CAMERAS, label: '实时监控', icon: Cctv },
    { id: ViewState.AI_FOREMAN, label: '鸡工头对话', icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-screen
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <div className="bg-construction-yellow p-2 rounded-full text-black">
            <Construction size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-construction-yellow">鸡哥建设</h1>
            <p className="text-xs text-slate-400">安全生产 {new Date().getFullYear()}</p>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id);
                  if (window.innerWidth < 768) toggleMobile();
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-construction-yellow text-slate-900 font-bold shadow-lg shadow-orange-500/20' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-3">
            <img 
              src="https://picsum.photos/seed/foreman/50/50" 
              alt="Admin" 
              className="w-10 h-10 rounded-full border-2 border-construction-yellow"
            />
            <div>
              <p className="text-sm font-bold text-white">管理员鸡哥</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                在线指挥
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};