
import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Activity, Wifi } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Generate sample performance data
const generatePerformanceData = (hours, baseValue, variance) => {
  return Array.from({ length: hours }, (_, i) => {
    const value = baseValue + Math.random() * variance * 2 - variance;
    return {
      time: `${i}h`,
      value: Math.max(0, parseFloat(value.toFixed(1)))
    };
  });
};

const PerformanceMetrics = ({ proxy }) => {
  const [timeRange, setTimeRange] = useState('24h');
  
  // Generate sample data based on time range
  const hours = timeRange === '1h' ? 12 : timeRange === '24h' ? 24 : 7 * 24;
  const interval = timeRange === '1h' ? 5 : timeRange === '24h' ? 4 : 24;
  
  const responseTimeData = generatePerformanceData(hours, proxy.responseTime, 50);
  const uptimeData = generatePerformanceData(hours, proxy.uptime, 2);
  const bandwidthData = generatePerformanceData(hours, 50, 20);

  const MetricCard = ({ title, value, change, icon, suffix = '', decimals = 0 }) => {
    const isPositive = change >= 0;
    return (
      <div className="bg-card/50 rounded-lg p-3 border border-border">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground">{title}</p>
            <p className="text-xl font-semibold">{value.toFixed(decimals)}{suffix}</p>
          </div>
          {icon}
        </div>
        <div className={`mt-2 text-xs flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{Math.abs(change).toFixed(1)}% from previous</span>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Performance</CardTitle>
            <CardDescription>Real-time monitoring metrics</CardDescription>
          </div>
          <Tabs defaultValue="24h" value={timeRange} onValueChange={setTimeRange} className="w-fit">
            <TabsList className="h-7">
              <TabsTrigger value="1h" className="text-xs px-2">1h</TabsTrigger>
              <TabsTrigger value="24h" className="text-xs px-2">24h</TabsTrigger>
              <TabsTrigger value="7d" className="text-xs px-2">7d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            title="Response Time" 
            value={proxy.responseTime} 
            change={-2.3} 
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            suffix="ms"
          />
          <MetricCard 
            title="Uptime" 
            value={proxy.uptime} 
            change={0.2} 
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
            suffix="%"
            decimals={1}
          />
        </div>
        
        <div className="h-[180px] mt-4">
          <p className="text-xs text-muted-foreground mb-2 flex items-center">
            <Wifi className="h-4 w-4 mr-1" /> Bandwidth Usage
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={bandwidthData}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="bandwidthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FEF08A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FEF08A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }} 
                interval={interval}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 10 }} 
                width={25}
                stroke="#666"
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#EAB308" 
                strokeWidth={2}
                fill="url(#bandwidthGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
