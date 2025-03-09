import { useMemo } from 'react';
import { Line, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type VisitorData = {
  date: string;
  hour: number;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: 'chrome' | 'firefox' | 'safari' | 'edge';
  channel: 'organic' | 'paid' | 'social' | 'email';
  isSignup: boolean;
};

type Props = {
  data: VisitorData[];
  yAxis: 'visitors' | 'signups' | 'signup_rate';
  breakdown: 'none' | 'device' | 'browser' | 'channel';
  chartType: 'line' | 'area';
};

export default function DataChart({ data, yAxis, breakdown, chartType }: Props) {
  const chartData = useMemo(() => {
    const dailyData = data.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = { date, visitors: 0, signups: 0 };
      }
      acc[date].visitors++;
      if (curr.isSignup) acc[date].signups++;

      if (breakdown !== 'none') {
        const breakdownValue = curr[breakdown];
        if (!acc[date][breakdownValue]) {
          acc[date][breakdownValue] = { visitors: 0, signups: 0 };
        }
        acc[date][breakdownValue].visitors++;
        if (curr.isSignup) acc[date][breakdownValue].signups++;
      }

      return acc;
    }, {} as Record<string, any>);

    return Object.values(dailyData).map(day => ({
      ...day,
      signup_rate: day.signups / day.visitors,
      ...(breakdown !== 'none' && Object.fromEntries(
        Object.entries(day).filter(([key]) => key !== 'date' && key !== 'visitors' && key !== 'signups').map(([key, value]: [string, any]) => [
          key,
          { ...value, signup_rate: value.signups / value.visitors }
        ])
      ))
    }));
  }, [data, breakdown]);

  const breakdownValues = useMemo(() => {
    if (breakdown === 'none') return [];
    return Array.from(new Set(data.map(d => d[breakdown])));
  }, [data, breakdown]);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'];

  const renderChart = () => {
    const ChartComponent = chartType === 'line' ? LineChart : AreaChart;
    const DataComponent = chartType === 'line' ? Line : Area;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {breakdown === 'none' ? (
            <DataComponent
              type="monotone"
              dataKey={yAxis}
              stroke={colors[0]}
              fill={chartType === 'area' ? colors[0] : undefined}
              name={yAxis.charAt(0).toUpperCase() + yAxis.slice(1).replace('_', ' ')}
            />
          ) : (
            breakdownValues.map((value, index) => (
              <DataComponent
                key={value}
                type="monotone"
                dataKey={`${value}.${yAxis}`}
                stroke={colors[index % colors.length]}
                fill={chartType === 'area' ? colors[index % colors.length] : undefined}
                name={`${value} ${yAxis}`}
                stackId={chartType === 'area' ? "1" : undefined}
              />
            ))
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return renderChart();
}

