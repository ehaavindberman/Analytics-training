'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import DataChart from './DataChart';
import { ScenarioTimer } from './ScenarioTimer';
import { ArrowLeft, CheckCircle, Share2 } from 'lucide-react';

type VisitorData = {
  date: string;
  hour: number;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: 'chrome' | 'firefox' | 'safari' | 'edge';
  channel: 'organic' | 'paid' | 'social' | 'email';
  isSignup: boolean;
};

type ChartType = 'line' | 'area';

export default function AnalyticsDashboard({ onSuccess, scenario, onBackToScenarios }: { onSuccess: (time: number) => void, scenario: number, onBackToScenarios: () => void }) {
  const [data, setData] = useState<VisitorData[]>([]);
  const [filteredData, setFilteredData] = useState<VisitorData[]>([]);
  const [yAxis, setYAxis] = useState<'visitors' | 'signups' | 'signup_rate'>('signups');
  const [breakdown, setBreakdown] = useState<'none' | 'device' | 'browser' | 'channel'>('none');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [findings, setFindings] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [filters, setFilters] = useState({
    device: 'all',
    browser: 'all',
    channel: 'all',
  });
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    fetch(`/api/data?scenario=${scenario}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
      });
  }, [scenario]);

  useEffect(() => {
    const newFilteredData = data.filter(item => 
      (filters.device === 'all' || item.device === filters.device) &&
      (filters.browser === 'all' || item.browser === filters.browser) &&
      (filters.channel === 'all' || item.channel === filters.channel)
    );
    setFilteredData(newFilteredData);
  }, [data, filters]);

  const handleSubmit = () => {
    setIsTimerRunning(false);
    if (scenario === 1) {
      if (findings.toLowerCase().includes('mobile') && findings.toLowerCase().includes('signup')) {
        setFeedback("Correct! You've identified that mobile signups dropped significantly.");
        setIsCompleted(true);
      } else {
        setFeedback("Not quite. Try looking at the signup rates for different devices.");
      }
    } else if (scenario === 2) {
      if (findings.toLowerCase().includes('mobile') && findings.toLowerCase().includes('social') && findings.toLowerCase().includes('visitors')) {
        setFeedback("Excellent work! You've correctly identified that mobile visitors from the social channel dropped by half.");
        setIsCompleted(true);
      } else {
        setFeedback("Not quite. Try looking at the visitors for different devices and channels.");
      }
    } else if (scenario === 3) {
      if (findings.toLowerCase().includes('organic') && findings.toLowerCase().includes('spike') && findings.toLowerCase().includes('signup rate')) {
        setFeedback("Great job! You've correctly identified the spike in organic traffic and its impact on the overall signup rate.");
        setIsCompleted(true);
      } else {
        setFeedback("Not quite. Try looking at the changes in organic traffic and how it affects the overall signup rate.");
      }
    }
  };

  const handleTimerComplete = (time: number) => {
    if (isCompleted) {
      onSuccess(time);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBackToScenarios} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scenarios
        </Button>
        <ScenarioTimer isRunning={isTimerRunning} onComplete={handleTimerComplete} />
        {isCompleted && (
          <div className="flex items-center text-green-500">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span>Scenario Completed</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chart Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="y-axis" className="mb-2 block">Y-Axis</Label>
                  <Select value={yAxis} onValueChange={(value) => setYAxis(value as any)}>
                    <SelectTrigger id="y-axis" className="w-full">
                      <SelectValue placeholder="Signups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visitors">Visitors</SelectItem>
                      <SelectItem value="signups">Signups</SelectItem>
                      <SelectItem value="signup_rate">Signup Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="breakdown" className="mb-2 block">Breakdown</Label>
                  <Select value={breakdown} onValueChange={(value) => setBreakdown(value as any)}>
                    <SelectTrigger id="breakdown" className="w-full">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="device">Device</SelectItem>
                      <SelectItem value="browser">Browser</SelectItem>
                      <SelectItem value="channel">Channel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="chart-type" className="mb-2 block">Chart Type</Label>
                  <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
                    <SelectTrigger id="chart-type" className="w-full">
                      <SelectValue placeholder="Line Chart" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="area">Stacked Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Data Visualization - Scenario {scenario}</CardTitle>
              <CardDescription>
                {scenario === 1
                  ? "Analyze the company's signup data to find out why signups have dropped."
                  : scenario === 2
                  ? "Investigate the recent changes in visitor patterns across different channels and devices."
                  : "Examine the impact of a sudden change in organic traffic on overall signup rates."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <DataChart data={filteredData} yAxis={yAxis} breakdown={breakdown} chartType={chartType} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your Findings</CardTitle>
              <CardDescription>Describe what you think is happening with the data</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your findings here..."
                value={findings}
                onChange={(e) => setFindings(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleSubmit}>Submit Findings</Button>
              {feedback && <p className="mt-4 text-green-600">{feedback}</p>}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={filters.device} onValueChange={(value) => setFilters(prev => ({ ...prev, device: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.browser} onValueChange={(value) => setFilters(prev => ({ ...prev, browser: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Browser" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Browsers</SelectItem>
                  <SelectItem value="chrome">Chrome</SelectItem>
                  <SelectItem value="firefox">Firefox</SelectItem>
                  <SelectItem value="safari">Safari</SelectItem>
                  <SelectItem value="edge">Edge</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.channel} onValueChange={(value) => setFilters(prev => ({ ...prev, channel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

