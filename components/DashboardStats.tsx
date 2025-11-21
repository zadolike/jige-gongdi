import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { SiteMetric } from '../types';
import { TrendingUp, Users, BrickWall, AlertTriangle } from 'lucide-react';

const dataStats = [
  { name: 'Mon', cement: 400, bricks: 240, progress: 20 },
  { name: 'Tue', cement: 300, bricks: 139, progress: 25 },
  { name: 'Wed', cement: 200, bricks: 980, progress: 40 },
  { name: 'Thu', cement: 278, bricks: 390, progress: 55 },
  { name: 'Fri', cement: 189, bricks: 480, progress: 60 },
  { name: 'Sat', cement: 239, bricks: 380, progress: 75 },
  { name: 'Sun', cement: 349, bricks: 430, progress: 82 },
];

const MetricCard: React.FC<{ metric: SiteMetric; icon: React.ReactNode; color: string }> = ({ metric, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-gray-800">{metric.value}</h3>
        <span className="text-xs text-gray-400">{metric.unit}</span>
      </div>
      <div className={`text-xs mt-2 font-medium ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {metric.change > 0 ? '+' : ''}{metric.change}% 较昨日
      </div>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      {icon}
    </div>
  </div>
);

export const DashboardStats: React.FC = () => {
  const metrics: SiteMetric[] = [
    { label: '在岗鸡工', value: 128, change: 5.2, unit: '只' },
    { label: '今日搬砖', value: '12,450', change: 12.5, unit: '块' },
    { label: '安全生产', value: 452, change: 0.2, unit: '天' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          metric={metrics[0]} 
          icon={<Users className="text-blue-600" />} 
          color="bg-blue-50" 
        />
        <MetricCard 
          metric={metrics[1]} 
          icon={<BrickWall className="text-orange-600" />} 
          color="bg-orange-50" 
        />
        <MetricCard 
          metric={metrics[2]} 
          icon={<TrendingUp className="text-green-600" />} 
          color="bg-green-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-construction-yellow rounded-sm"></span>
            物资消耗趋势
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="cement" fill="#FFC107" radius={[4, 4, 0, 0]} name="水泥消耗 (kg)" />
                <Bar dataKey="bricks" fill="#212121" radius={[4, 4, 0, 0]} name="搬砖数量" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
             <span className="w-2 h-6 bg-orange-500 rounded-sm"></span>
            工程总进度
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#FF9800" 
                  strokeWidth={4}
                  dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                  name="完成度 (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-4">
        <div className="bg-red-100 p-2 rounded-full shrink-0">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
        <div>
          <h4 className="text-red-800 font-bold">安全预警 (Real-time)</h4>
          <p className="text-red-600 text-sm mt-1">
            3号工地发现一只偷懒的小鸡在睡觉，请工头立即前往查看。
            <span className="block mt-1 text-xs opacity-75">10分钟前 - 监控系统自动上报</span>
          </p>
        </div>
      </div>
    </div>
  );
};