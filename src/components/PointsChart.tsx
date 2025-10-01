import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface FanPoints {
  id: string;
  action_type: string;
  points: number;
  metadata: any;
  created_at: string;
}

interface PointsChartProps {
  points: FanPoints[];
}

export function PointsChart({ points }: PointsChartProps) {
  // Process points data for chart
  const chartData = points
    .slice(-30) // Last 30 entries
    .map((point, index) => {
      const cumulativePoints = points
        .slice(0, points.indexOf(point) + 1)
        .reduce((sum, p) => sum + p.points, 0);
      
      return {
        date: point.created_at,
        points: cumulativePoints,
        action: point.action_type,
        dailyPoints: point.points,
      };
    })
    .reverse(); // Show newest first

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No points history available yet. Start earning points!
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date"
            tickFormatter={(value) => format(new Date(value), 'MM/dd')}
            className="text-xs"
          />
          <YAxis className="text-xs" />
          <Tooltip
            labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
            formatter={(value: number, name: string) => [
              `${value} points`,
              name === 'points' ? 'Total Points' : name
            ]}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="points" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}