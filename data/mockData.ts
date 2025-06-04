import { format, subDays } from 'date-fns';

export interface Score {
  value: number;
  trend: number;
  timestamp: string;
}

export interface HeartRateData {
  timestamp: Date;
  bpm: number;
  zone: 'rest' | 'light' | 'moderate' | 'vigorous' | 'maximum';
}

export interface DailyScores {
  recovery: Score;
  sleep: Score;
  hydration: Score;
  strain: Score;
  heartRate: {
    current: number;
    resting: number;
    max: number;
    data: HeartRateData[];
  };
}

const generateHeartRateData = (date: Date): HeartRateData[] => {
  const data: HeartRateData[] = [];
  const baseTime = new Date(date);
  baseTime.setHours(6, 0, 0, 0); // Start at 6 AM

  // Simulate a workout session
  for (let i = 0; i < 60; i++) {
    const time = new Date(baseTime.getTime() + i * 60000); // Every minute
    let bpm: number;
    
    // Simulate different phases of workout
    if (i < 10) { // Warm up
      bpm = 70 + Math.round(i * 3 + Math.random() * 5);
    } else if (i < 40) { // Main workout
      bpm = 130 + Math.round(Math.sin(i * 0.2) * 20 + Math.random() * 10);
    } else { // Cool down
      bpm = 130 - Math.round((i - 40) * 2 + Math.random() * 5);
    }

    const zone = getHeartRateZone(bpm);
    data.push({ timestamp: time, bpm, zone });
  }

  return data;
};

const getHeartRateZone = (bpm: number): HeartRateData['zone'] => {
  if (bpm < 90) return 'rest';
  if (bpm < 110) return 'light';
  if (bpm < 130) return 'moderate';
  if (bpm < 150) return 'vigorous';
  return 'maximum';
};

// Generate realistic mock data for the past 7 days
const generateMockData = (): Record<string, DailyScores> => {
  const data: Record<string, DailyScores> = {};
  
  for (let i = 0; i < 7; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const currentDate = subDays(new Date(), i);
    
    const baseRecovery = 55 + Math.random() * 20;
    const recoveryTrend = Math.random() * 10 - 5;
    
    const baseSleep = 40 + Math.random() * 30;
    const sleepTrend = Math.random() * 15 - 7.5;
    
    const baseHydration = 45 + Math.random() * 15;
    const hydrationTrend = Math.random() * 8 - 4;
    
    const baseStrain = 35 + Math.random() * 25;
    const strainTrend = Math.random() * 12 - 6;

    const restingHR = 60 + Math.round(Math.random() * 10);
    const maxHR = 180 + Math.round(Math.random() * 20);
    const currentHR = restingHR + Math.round(Math.random() * 20);

    data[date] = {
      recovery: {
        value: Math.round(baseRecovery),
        trend: Math.round(recoveryTrend),
        timestamp: date,
      },
      sleep: {
        value: Math.round(baseSleep),
        trend: Math.round(sleepTrend),
        timestamp: date,
      },
      hydration: {
        value: Math.round(baseHydration),
        trend: Math.round(hydrationTrend),
        timestamp: date,
      },
      strain: {
        value: Math.round(baseStrain),
        trend: Math.round(strainTrend),
        timestamp: date,
      },
      heartRate: {
        current: currentHR,
        resting: restingHR,
        max: maxHR,
        data: generateHeartRateData(currentDate),
      },
    };
  }
  
  return data;
};

export const mockData = generateMockData();

export const getLatestScores = (): DailyScores => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return mockData[today] || Object.values(mockData)[0];
};

export const getScoreDescription = (type: keyof DailyScores, value: number): string => {
  switch (type) {
    case 'recovery':
      if (value < 30) return "Critical recovery state. Focus on rest and gentle movements only.";
      if (value < 60) return "Your body is still adapting post-pregnancy. Focus on gentle activities.";
      if (value < 80) return "Good recovery. You can gradually increase activity while monitoring.";
      return "Excellent recovery. Continue with your current routine while staying mindful.";
    
    case 'sleep':
      if (value < 30) return "Sleep quality is severely impacted. Consider getting help with night feedings.";
      if (value < 60) return "Interrupted sleep patterns detected. Try to sync your sleep schedule.";
      if (value < 80) return "Sleep quality is improving. Maintain current sleep hygiene practices.";
      return "Excellent sleep quality. Your sleep adaptation is progressing well.";
    
    case 'hydration':
      if (value < 30) return "Critically low hydration. Increase water intake immediately.";
      if (value < 60) return "Your hydration is below optimal levels. Increase water intake.";
      if (value < 80) return "Good hydration levels. Continue regular water intake throughout the day.";
      return "Excellent hydration. Maintain current fluid intake patterns.";
    
    case 'strain':
      if (value < 30) return "Very low activity level. Gradually introduce light movement as you feel ready.";
      if (value < 60) return "Moderate activity level. This is appropriate for early postpartum recovery.";
      if (value < 80) return "Good activity level. Ensure you're balancing activity with rest.";
      return "High activity level. Monitor your recovery scores to ensure you're not overexerting.";
    
    default:
      return "No description available.";
  }
};

export const getHeartRateZoneColor = (zone: HeartRateData['zone']): string => {
  switch (zone) {
    case 'rest': return '#10b981';
    case 'light': return '#3b82f6';
    case 'moderate': return '#f59e0b';
    case 'vigorous': return '#ef4444';
    case 'maximum': return '#7c3aed';
    default: return '#6b7280';
  }
};

export const getHeartRateZoneDescription = (zone: HeartRateData['zone']): string => {
  switch (zone) {
    case 'rest':
      return 'Recovery zone - Perfect for warm-up and cool-down';
    case 'light':
      return 'Fat burning zone - Good for building endurance';
    case 'moderate':
      return 'Aerobic zone - Improving cardiovascular fitness';
    case 'vigorous':
      return 'Anaerobic zone - Increasing performance capacity';
    case 'maximum':
      return 'Maximum zone - For short intervals only';
    default:
      return '';
  }
};