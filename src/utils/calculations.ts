import { MonthConfig, DayRecord, DailySummary, MonthStats } from '../types/tracker';

/**
 * Generates ISO date string YYYY-MM-DD
 */
export function formatDayDateStr(year: number, month: number, day: number): string {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

/**
 * Returns DayOfWeek (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 */
export function getDayOfWeek(year: number, month: number, day: number): number {
  return new Date(year, month - 1, day).getDay();
}

/**
 * Calculates summary for a single day
 */
export function calculateDailySummary(
  monthConfig: MonthConfig,
  dayNumber: number,
  dayData: DayRecord = {}
): DailySummary {
  const dateStr = formatDayDateStr(monthConfig.year, monthConfig.month, dayNumber);
  const dayOfWeek = getDayOfWeek(monthConfig.year, monthConfig.month, dayNumber);
  const dayConfig = monthConfig.getDayConfig(dateStr, dayNumber, dayOfWeek);

  const compulsoryTasks = dayConfig.tasks.filter((t) => t.isCompulsory);
  const totalCompulsory = compulsoryTasks.length; // usually 8

  let completedCompulsory = 0;
  for (const task of compulsoryTasks) {
    if (dayData[task.id]) {
      completedCompulsory++;
    }
  }

  const completionPercentage = totalCompulsory > 0 ? Math.round((completedCompulsory / totalCompulsory) * 100) : 0;
  const isPerfectDay = completedCompulsory === totalCompulsory && totalCompulsory > 0;
  const hasValorant = Boolean(dayData['valorant']);
  const activeCareerTask = dayConfig.scheduledCareerType;
  const careerTaskCompleted = Boolean(dayData[activeCareerTask]);
  const studyCompleted = Boolean(dayData['study']);

  let statusMessage = '';
  let statusType: 'zero' | 'low' | 'medium' | 'high' | 'perfect' = 'zero';

  if (completionPercentage === 100) {
    statusMessage = 'Perfect day. You handled your responsibilities.';
    statusType = 'perfect';
  } else if (completionPercentage >= 75) {
    statusMessage = 'Almost there. Finish the remaining tasks.';
    statusType = 'high';
  } else if (completionPercentage >= 50) {
    statusMessage = "Decent progress. Don't stop halfway.";
    statusType = 'medium';
  } else if (completionPercentage > 0) {
    statusMessage = "You're falling behind. Get back on track.";
    statusType = 'low';
  } else {
    statusMessage = 'Zero progress today. Fix it before the day ends.';
    statusType = 'zero';
  }

  return {
    dateStr,
    dayNumber,
    dayName: dayConfig.dayName,
    totalCompulsory,
    completedCompulsory,
    completionPercentage,
    isPerfectDay,
    hasValorant,
    activeCareerTask,
    careerTaskCompleted,
    studyCompleted,
    statusMessage,
    statusType,
  };
}

/**
 * Calculates aggregate stats for a month
 */
export function calculateMonthStats(
  monthConfig: MonthConfig,
  monthDaysData: Record<string, DayRecord>,
  todayDateStr?: string
): MonthStats {
  const totalDays = monthConfig.daysCount;
  let totalCompulsoryTasks = 0;
  let completedCompulsoryTasks = 0;
  let perfectDaysCount = 0;
  let totalDailyPercentages = 0;

  let internshipCompletedDays = 0;
  let internshipTotalDays = 0;

  let studyCompletedDays = 0;

  let webDevCompletedDays = 0;
  let webDevScheduledDays = 0;

  let gameDevCompletedDays = 0;
  let gameDevScheduledDays = 0;

  let bathingCompletedDays = 0;
  let mealsCompletedTotal = 0;
  let mealsTotalExpected = 0;

  let valorantDays = 0;

  // Track perfect days flags for streak calculation
  const perfectFlags: boolean[] = [];

  for (let day = 1; day <= totalDays; day++) {
    const dateStr = formatDayDateStr(monthConfig.year, monthConfig.month, day);
    const dayData = monthDaysData[dateStr] || {};
    const summary = calculateDailySummary(monthConfig, day, dayData);

    totalCompulsoryTasks += summary.totalCompulsory;
    completedCompulsoryTasks += summary.completedCompulsory;
    totalDailyPercentages += summary.completionPercentage;

    if (summary.isPerfectDay) {
      perfectDaysCount++;
      perfectFlags.push(true);
    } else {
      perfectFlags.push(false);
    }

    // Specific counts
    internshipTotalDays++;
    if (dayData['internship']) internshipCompletedDays++;
    if (dayData['study']) studyCompletedDays++;
    if (dayData['bathing']) bathingCompletedDays++;

    // Meals: 4 per day
    mealsTotalExpected += 4;
    if (dayData['meal7']) mealsCompletedTotal++;
    if (dayData['meal11']) mealsCompletedTotal++;
    if (dayData['meal4']) mealsCompletedTotal++;
    if (dayData['meal9']) mealsCompletedTotal++;

    // Career scheduling
    const dayOfWeek = getDayOfWeek(monthConfig.year, monthConfig.month, day);
    const isWebDev = dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3;
    if (isWebDev) {
      webDevScheduledDays++;
      if (dayData['webDev']) webDevCompletedDays++;
    } else {
      gameDevScheduledDays++;
      if (dayData['gameDev']) gameDevCompletedDays++;
    }

    if (dayData['valorant']) {
      valorantDays++;
    }
  }

  // Calculate Streaks
  let longestStreak = 0;
  let runningStreak = 0;

  for (let i = 0; i < perfectFlags.length; i++) {
    if (perfectFlags[i]) {
      runningStreak++;
      if (runningStreak > longestStreak) {
        longestStreak = runningStreak;
      }
    } else {
      runningStreak = 0;
    }
  }

  // Calculate Current Streak based on latest filled / active days
  // If today is in this month, look at today and backwards.
  // If today has 100%, streak includes today. If today is in-progress (not 100%), check if yesterday was 100% to preserve active streak.
  let currentStreak = 0;
  
  // Determine relevant day index (0-based)
  let refDayIndex = perfectFlags.length - 1;
  if (todayDateStr && todayDateStr.startsWith(monthConfig.id)) {
    const parts = todayDateStr.split('-');
    const todayDayNum = parseInt(parts[2], 10);
    if (!isNaN(todayDayNum) && todayDayNum >= 1 && todayDayNum <= totalDays) {
      refDayIndex = todayDayNum - 1;
    }
  } else {
    // If viewing month without today, look from the last day that had any activity, or from the end
    let lastActiveIdx = -1;
    for (let i = totalDays; i >= 1; i--) {
      const dStr = formatDayDateStr(monthConfig.year, monthConfig.month, i);
      const data = monthDaysData[dStr];
      if (data && Object.keys(data).length > 0) {
        lastActiveIdx = i - 1;
        break;
      }
    }
    if (lastActiveIdx !== -1) {
      refDayIndex = lastActiveIdx;
    }
  }

  // Count backwards from refDayIndex
  let checkIdx = refDayIndex;
  // If refDayIndex is not perfect yet, check if it's today (where user might still be completing)
  if (checkIdx >= 0 && !perfectFlags[checkIdx]) {
    // If today is incomplete, streak could be from yesterday
    if (checkIdx > 0 && perfectFlags[checkIdx - 1]) {
      checkIdx = checkIdx - 1;
    }
  }

  while (checkIdx >= 0 && perfectFlags[checkIdx]) {
    currentStreak++;
    checkIdx--;
  }

  const overallCompletionPercentage =
    totalCompulsoryTasks > 0 ? Math.round((completedCompulsoryTasks / totalCompulsoryTasks) * 100) : 0;
  const averageDailyPercentage =
    totalDays > 0 ? Math.round(totalDailyPercentages / totalDays) : 0;
  const incompleteDaysCount = totalDays - perfectDaysCount;

  // Study hours
  const studyTotalHoursTarget = totalDays * 3; // 31 * 3 = 93
  const studyCompletedHours = studyCompletedDays * 3;
  const studyRemainingHours = Math.max(0, studyTotalHoursTarget - studyCompletedHours);
  const studyPercentage =
    studyTotalHoursTarget > 0 ? Math.round((studyCompletedHours / studyTotalHoursTarget) * 100) : 0;

  // Career percentages
  const internshipPercentage =
    internshipTotalDays > 0 ? Math.round((internshipCompletedDays / internshipTotalDays) * 100) : 0;
  const webDevPercentage =
    webDevScheduledDays > 0 ? Math.round((webDevCompletedDays / webDevScheduledDays) * 100) : 0;
  const gameDevPercentage =
    gameDevScheduledDays > 0 ? Math.round((gameDevCompletedDays / gameDevScheduledDays) * 100) : 0;

  return {
    totalDays,
    totalCompulsoryTasks,
    completedCompulsoryTasks,
    overallCompletionPercentage,
    averageDailyPercentage,
    perfectDaysCount,
    incompleteDaysCount,
    currentStreak,
    longestStreak,
    
    internshipCompletedDays,
    internshipTotalDays,
    internshipPercentage,
    
    studyCompletedDays,
    studyTotalHoursTarget,
    studyCompletedHours,
    studyRemainingHours,
    studyPercentage,
    
    webDevCompletedDays,
    webDevScheduledDays,
    webDevPercentage,
    
    gameDevCompletedDays,
    gameDevScheduledDays,
    gameDevPercentage,
    
    bathingCompletedDays,
    mealsCompletedTotal,
    mealsTotalExpected,
    
    valorantDays,
  };
}
