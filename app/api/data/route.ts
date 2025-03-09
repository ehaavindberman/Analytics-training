import { NextRequest, NextResponse } from 'next/server';
import { generateDataset } from '@/utils/generateData';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const scenario = parseInt(searchParams.get('scenario') || '1', 10);
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 10); // Start 10 days ago
  const data = generateDataset(startDate, 10, scenario);
  return NextResponse.json(data);
}

