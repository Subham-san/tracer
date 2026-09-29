import { MonthConfig, DayTaskConfig, TaskDefinition } from '../types/tracker';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Creates task definitions for October 2026 routine
 * Monday, Tuesday, Wednesday -> Web Development
 * Thursday, Friday, Saturday, Sunday -> Game Development
 */
function createOctoberDayConfig(dateStr: string, dayNumber: number, dayOfWeek: number): DayTaskConfig {
  const isWebDevDay = dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3; // Mon, Tue, Wed
  const scheduledCareerType = isWebDevDay ? 'webDev' : 'gameDev';

  const tasks: TaskDefinition[] = [
    // 1. PERSONAL
    {
      id: 'bathing',
      title: 'Bathing',
      subtitle: 'Personal hygiene & morning freshness',
      category: 'personal',
      isCompulsory: true,
      iconName: 'Sparkles',
    },

    // 2-5. MEALS
    {
      id: 'meal7',
      title: 'Meal — 7:00 AM',
      subtitle: 'Nutritious breakfast before starting the day',
      category: 'meals',
      isCompulsory: true,
      timeSlot: '07:00 AM',
      iconName: 'Coffee',
    },
    {
      id: 'meal11',
      title: 'Meal — 11:00 AM',
      subtitle: 'Mid-morning replenishment',
      category: 'meals',
      isCompulsory: true,
      timeSlot: '11:00 AM',
      iconName: 'Apple',
    },
    {
      id: 'meal4',
      title: 'Meal — 4:00 PM',
      subtitle: 'Afternoon fuel & energy snack',
      category: 'meals',
      isCompulsory: true,
      timeSlot: '04:00 PM',
      iconName: 'Utensils',
    },
    {
      id: 'meal9',
      title: 'Meal — 9:00 PM',
      subtitle: 'Dinner & evening digestion',
      category: 'meals',
      isCompulsory: true,
      timeSlot: '09:00 PM',
      iconName: 'Moon',
    },

    // 6. STUDY
    {
      id: 'study',
      title: 'Study — 3 Hours',
      subtitle: 'Semester syllabus, assignments, or sessional prep',
      category: 'study',
      isCompulsory: true,
      studyHoursValue: 3,
      iconName: 'BookOpen',
    },

    // 7. CAREER: Online Internship (Compulsory every single day)
    {
      id: 'internship',
      title: 'Online Internship',
      subtitle: 'Daily deliverables, tasks & practical work',
      category: 'career',
      isCompulsory: true,
      iconName: 'Briefcase',
    },

    // 8. CAREER: Scheduled daily specialization
    isWebDevDay
      ? {
          id: 'webDev',
          title: 'Web Development',
          subtitle: 'Scheduled: Mon, Tue, Wed (Frontend, React, Full-stack)',
          category: 'career',
          isCompulsory: true,
          iconName: 'Code',
        }
      : {
          id: 'gameDev',
          title: 'Game Development',
          subtitle: 'Scheduled: Thu, Fri, Sat, Sun (Game mechanics, engines)',
          category: 'career',
          isCompulsory: true,
          iconName: 'Gamepad2',
        },

    // 9. OPTIONAL: Valorant
    {
      id: 'valorant',
      title: 'Valorant',
      subtitle: 'Gaming unwind • Optional (Does not affect completion %)',
      category: 'optional',
      isCompulsory: false,
      iconName: 'Crosshair',
    },
  ];

  return {
    dateStr,
    dayNumber,
    dayOfWeek,
    dayName: DAY_NAMES[dayOfWeek],
    scheduledCareerType,
    tasks,
  };
}

/**
 * Registry of month configurations
 * Easily extensible for November 2026 (exams) and future months
 */
export const MONTHS_REGISTRY: Record<string, MonthConfig> = {
  '2026-10': {
    id: '2026-10',
    year: 2026,
    month: 10,
    name: 'October 2026',
    daysCount: 31,
    themeNote: 'Foundation & Balanced Development Routine',
    getDayConfig: (dateStr: string, dayNumber: number, dayOfWeek: number) => {
      return createOctoberDayConfig(dateStr, dayNumber, dayOfWeek);
    },
  },
  '2026-11': {
    id: '2026-11',
    year: 2026,
    month: 11,
    name: 'November 2026',
    daysCount: 30,
    themeNote: 'College Exams & High Priority Revision (Ready for exam configuration)',
    getDayConfig: (dateStr: string, dayNumber: number, dayOfWeek: number) => {
      // November baseline placeholder using the same modular architecture,
      // ready to be updated when user provides exam schedule!
      return createOctoberDayConfig(dateStr, dayNumber, dayOfWeek);
    },
  },
};

export const DEFAULT_MONTH_ID = '2026-10';

export function getMonthConfig(monthId: string): MonthConfig {
  if (MONTHS_REGISTRY[monthId]) {
    return MONTHS_REGISTRY[monthId];
  }
  // Fallback generator for any month YYYY-MM
  const [yearStr, monthStr] = monthId.split('-');
  const year = parseInt(yearStr, 10) || 2026;
  const month = parseInt(monthStr, 10) || 10;
  const daysCount = new Date(year, month, 0).getDate();
  const dateObj = new Date(year, month - 1, 1);
  const monthName = dateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return {
    id: monthId,
    year,
    month,
    name: monthName,
    daysCount,
    themeNote: 'Standard Routine',
    getDayConfig: (dateStr: string, dayNumber: number, dayOfWeek: number) => {
      return createOctoberDayConfig(dateStr, dayNumber, dayOfWeek);
    },
  };
}
