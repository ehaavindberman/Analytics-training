import { addDays, format } from 'date-fns';

type VisitorData = {
  date: string;
  hour: number;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: 'chrome' | 'firefox' | 'safari' | 'edge';
  channel: 'organic' | 'paid' | 'social' | 'email';
  isSignup: boolean;
};

const devices = ['desktop', 'mobile', 'tablet'] as const;
const browsers = ['chrome', 'firefox', 'safari', 'edge'] as const;
const channels = ['organic', 'paid', 'social', 'email'] as const;

function getRandomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateHourlyVisitors(date: Date, baseVisitors: number, scenario: number, dayIndex: number): VisitorData[] {
  const visitors: VisitorData[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourlyFactor = Math.sin((hour - 6) * Math.PI / 12) * 0.5 + 1; // More visitors during daytime
    let visitorCount = Math.floor(baseVisitors * hourlyFactor);
    
    for (let i = 0; i < visitorCount; i++) {
      const device = getRandomElement(devices);
      const browser = getRandomElement(browsers);
      let channel = getRandomElement(channels);
      
      let signupProbability = 0.1; // Base signup rate
      if (device === 'desktop') signupProbability *= 1.2;
      if (browser === 'chrome') signupProbability *= 1.1;
      if (channel === 'paid') signupProbability *= 1.3;
      
      // Scenario 1: Mobile signups drop to 0 after the 8th day
      if (scenario === 1 && dayIndex >= 8 && device === 'mobile') {
        signupProbability = 0;
      }
      
      // Scenario 2: Mobile visitors from social channel drop by half on the 8th day
      if (scenario === 2 && dayIndex >= 8 && device === 'mobile' && channel === 'social') {
        if (Math.random() < 0.5) continue; // Skip 50% of mobile social visitors
      }
      
      // Scenario 3: Organic traffic spike on day 8, tapering off on days 9 and 10
      if (scenario === 3) {
        if (dayIndex === 8 && Math.random() < 0.5) {
          channel = 'organic';
          signupProbability *= 0.5; // Organic visitors are less likely to sign up
        } else if (dayIndex === 9 && Math.random() < 0.3) {
          channel = 'organic';
          signupProbability *= 0.5;
        } else if (dayIndex === 10 && Math.random() < 0.1) {
          channel = 'organic';
          signupProbability *= 0.5;
        }
      }
      
      const isSignup = Math.random() < signupProbability;
      
      visitors.push({
        date: format(date, 'yyyy-MM-dd'),
        hour,
        device,
        browser,
        channel,
        isSignup,
      });
    }
  }
  return visitors;
}

export function generateDataset(startDate: Date, days: number, scenario: number): VisitorData[] {
  let allData: VisitorData[] = [];
  for (let i = 0; i < days; i++) {
    const currentDate = addDays(startDate, i);
    const dailyVisitors = generateHourlyVisitors(currentDate, 1000, scenario, i);
    allData = allData.concat(dailyVisitors);
  }
  return allData;
}

