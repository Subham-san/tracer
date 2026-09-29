export type TaskCategory = 'personal' | 'meals' | 'study' | 'career' | 'optional';

export interface TaskDefinition {
  id: string;
  title: string;
  subtitle?: string;
  category: TaskCategory;
  isCompulsory: boolean;
  timeSlot?: string;
  iconName?: string;
  studyHoursValue?: number; // default 3 for study
}

export interface DayTaskConfig {
  dateStr: string; // YYYY-MM-DD
  dayNumber: number; // 1-31
  dayOfWeek: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  dayName: string; // Monday, Tuesday...
  scheduledCareerType: 'webDev' | 'gameDev';
  tasks: TaskDefinition[];
}

export type DayRecord = Record<string, boolean>;

export interface MonthData {
  days: Record<string, DayRecord>;
}

export interface MonthConfig {
  id: string; // "2026-10"
  year: number;
  month: number; // 1-12
  name: string; // "October 2026"
  daysCount: number;
  themeNote?: string;
  getDayConfig: (dateStr: string, dayNumber: number, dayOfWeek: number) => DayTaskConfig;
}

export interface UserProfile {
  name: string;
  role: string;
  institution: string;
  currentFocus: string;
  longTermGoal: string;
  interests: string[];
  dailyFreeHours: number;
}

export interface DailySummary {
  dateStr: string;
  dayNumber: number;
  dayName: string;
  totalCompulsory: number;
  completedCompulsory: number;
  completionPercentage: number;
  isPerfectDay: boolean; // 100% compulsory completed
  hasValorant: boolean;
  activeCareerTask: 'webDev' | 'gameDev';
  careerTaskCompleted: boolean;
  studyCompleted: boolean;
  statusMessage: string;
  statusType: 'zero' | 'low' | 'medium' | 'high' | 'perfect';
}

export interface MonthStats {
  totalDays: number;
  totalCompulsoryTasks: number;
  completedCompulsoryTasks: number;
  overallCompletionPercentage: number;
  averageDailyPercentage: number;
  perfectDaysCount: number;
  incompleteDaysCount: number;
  currentStreak: number;
  longestStreak: number;
  
  // Specific tasks stats
  internshipCompletedDays: number;
  internshipTotalDays: number;
  internshipPercentage: number;
  
  studyCompletedDays: number;
  studyTotalHoursTarget: number;
  studyCompletedHours: number;
  studyRemainingHours: number;
  studyPercentage: number;
  
  webDevCompletedDays: number;
  webDevScheduledDays: number;
  webDevPercentage: number;
  
  gameDevCompletedDays: number;
  gameDevScheduledDays: number;
  gameDevPercentage: number;
  
  bathingCompletedDays: number;
  mealsCompletedTotal: number;
  mealsTotalExpected: number;
  
  valorantDays: number;
}

export type NavigationPage = 
  | 'dashboard'
  | 'tasks'
  | 'calendar'
  | 'career'
  | 'study'
  | 'statistics'
  | 'settings';
