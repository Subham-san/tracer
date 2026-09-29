import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  NavigationPage,
  UserProfile,
  DayRecord,
  DailySummary,
  MonthStats,
  DayTaskConfig,
} from '../types/tracker';
import { getMonthConfig, DEFAULT_MONTH_ID } from '../config/monthsConfig';
import {
  calculateDailySummary,
  calculateMonthStats,
  formatDayDateStr,
} from '../utils/calculations';
import {
  loadTrackerData,
  saveTrackerData,
  exportDataAsJson,
  validateImportedData,
  generateSampleWeekData,
  StoredTrackerData,
} from '../utils/storage';

export function useTracker() {
  const [data, setData] = useState<StoredTrackerData>(() => loadTrackerData());
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [celebrationActive, setCelebrationActive] = useState<boolean>(false);

  // Sync with localStorage whenever data changes
  useEffect(() => {
    saveTrackerData(data);
  }, [data]);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (data.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [data.theme]);

  // Detect real local date
  const todayDateStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const selectedMonthId = data.selectedMonthId || DEFAULT_MONTH_ID;
  const currentMonthConfig = useMemo(() => {
    return getMonthConfig(selectedMonthId);
  }, [selectedMonthId]);

  // Ensure selectedDateStr is valid for this month
  const selectedDateStr = useMemo(() => {
    if (data.selectedDateStr && data.selectedDateStr.startsWith(selectedMonthId)) {
      return data.selectedDateStr;
    }
    // Check if today matches month
    if (todayDateStr.startsWith(selectedMonthId)) {
      return todayDateStr;
    }
    // Default to 1st of month
    return formatDayDateStr(currentMonthConfig.year, currentMonthConfig.month, 1);
  }, [data.selectedDateStr, selectedMonthId, todayDateStr, currentMonthConfig]);

  const isTodayInCurrentMonth = todayDateStr.startsWith(selectedMonthId);

  // Month days data
  const currentMonthDays = useMemo(() => {
    return data.months[selectedMonthId]?.days || {};
  }, [data.months, selectedMonthId]);

  // Calculate monthly stats
  const monthStats: MonthStats = useMemo(() => {
    return calculateMonthStats(currentMonthConfig, currentMonthDays, todayDateStr);
  }, [currentMonthConfig, currentMonthDays, todayDateStr]);

  // Active day tasks and summary
  const selectedDayNumber = useMemo(() => {
    const parts = selectedDateStr.split('-');
    const day = parseInt(parts[2], 10);
    return isNaN(day) ? 1 : day;
  }, [selectedDateStr]);

  const activeDayData: DayRecord = useMemo(() => {
    return currentMonthDays[selectedDateStr] || {};
  }, [currentMonthDays, selectedDateStr]);

  const activeDayConfig: DayTaskConfig = useMemo(() => {
    const dayOfWeek = new Date(
      currentMonthConfig.year,
      currentMonthConfig.month - 1,
      selectedDayNumber
    ).getDay();
    return currentMonthConfig.getDayConfig(selectedDateStr, selectedDayNumber, dayOfWeek);
  }, [currentMonthConfig, selectedDateStr, selectedDayNumber]);

  const dailySummary: DailySummary = useMemo(() => {
    return calculateDailySummary(currentMonthConfig, selectedDayNumber, activeDayData);
  }, [currentMonthConfig, selectedDayNumber, activeDayData]);

  // Toggle single task
  const toggleTask = useCallback(
    (taskId: string, targetDateStr?: string) => {
      const dateToUpdate = targetDateStr || selectedDateStr;
      const parts = dateToUpdate.split('-');
      const monthKey = `${parts[0]}-${parts[1]}`;
      const dayNum = parseInt(parts[2], 10);

      setData((prev) => {
        const monthEntry = prev.months[monthKey] || { days: {} };
        const dayEntry = { ...(monthEntry.days[dateToUpdate] || {}) };
        
        const newValue = !dayEntry[taskId];
        dayEntry[taskId] = newValue;

        // Check if this action triggers 100% completion for celebration
        const cfg = getMonthConfig(monthKey);
        const daySummary = calculateDailySummary(cfg, dayNum, dayEntry);
        if (daySummary.isPerfectDay && newValue) {
          setCelebrationActive(true);
          setTimeout(() => setCelebrationActive(false), 4000);
        }

        return {
          ...prev,
          months: {
            ...prev.months,
            [monthKey]: {
              ...monthEntry,
              days: {
                ...monthEntry.days,
                [dateToUpdate]: dayEntry,
              },
            },
          },
        };
      });
    },
    [selectedDateStr]
  );

  // Set all compulsory tasks for day to complete/incomplete
  const setAllTasksForDay = useCallback(
    (targetDateStr: string, completed: boolean) => {
      const parts = targetDateStr.split('-');
      const monthKey = `${parts[0]}-${parts[1]}`;
      const dayNum = parseInt(parts[2], 10);
      const cfg = getMonthConfig(monthKey);
      const dayOfWeek = new Date(cfg.year, cfg.month - 1, dayNum).getDay();
      const dayConfig = cfg.getDayConfig(targetDateStr, dayNum, dayOfWeek);

      setData((prev) => {
        const monthEntry = prev.months[monthKey] || { days: {} };
        const dayEntry = { ...(monthEntry.days[targetDateStr] || {}) };

        for (const task of dayConfig.tasks) {
          if (task.isCompulsory) {
            dayEntry[task.id] = completed;
          }
        }

        if (completed) {
          setCelebrationActive(true);
          setTimeout(() => setCelebrationActive(false), 4000);
        }

        return {
          ...prev,
          months: {
            ...prev.months,
            [monthKey]: {
              ...monthEntry,
              days: {
                ...monthEntry.days,
                [targetDateStr]: dayEntry,
              },
            },
          },
        };
      });
    },
    []
  );

  const setSelectedMonthId = useCallback((monthId: string) => {
    setData((prev) => {
      const newMonthConfig = getMonthConfig(monthId);
      const newDateStr = formatDayDateStr(newMonthConfig.year, newMonthConfig.month, 1);
      return {
        ...prev,
        selectedMonthId: monthId,
        selectedDateStr: newDateStr,
        months: {
          ...prev.months,
          [monthId]: prev.months[monthId] || { days: {} },
        },
      };
    });
  }, []);

  const setSelectedDateStr = useCallback((dateStr: string) => {
    setData((prev) => ({
      ...prev,
      selectedDateStr: dateStr,
    }));
  }, []);

  const setTheme = useCallback((theme: 'dark' | 'light') => {
    setData((prev) => ({
      ...prev,
      theme,
    }));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updates,
      },
    }));
  }, []);

  const resetMonthData = useCallback((monthId: string) => {
    setData((prev) => ({
      ...prev,
      months: {
        ...prev.months,
        [monthId]: {
          days: {},
        },
      },
    }));
  }, []);

  const loadSampleData = useCallback(() => {
    const sample = generateSampleWeekData();
    setData((prev) => ({
      ...prev,
      months: {
        ...prev.months,
        '2026-10': {
          days: {
            ...(prev.months['2026-10']?.days || {}),
            ...sample,
          },
        },
      },
    }));
  }, []);

  const exportData = useCallback(() => {
    exportDataAsJson(data, `subham-productivity-${selectedMonthId}.json`);
  }, [data, selectedMonthId]);

  const importData = useCallback((jsonStr: string): boolean => {
    const validated = validateImportedData(jsonStr);
    if (validated) {
      setData(validated);
      return true;
    }
    return false;
  }, []);

  // Navigation helpers
  const goToToday = useCallback(() => {
    if (isTodayInCurrentMonth) {
      setSelectedDateStr(todayDateStr);
    } else {
      // If today is in another month, optionally switch or default to today's month
      const parts = todayDateStr.split('-');
      const todayMonthId = `${parts[0]}-${parts[1]}`;
      setSelectedMonthId(todayMonthId);
      setSelectedDateStr(todayDateStr);
    }
  }, [isTodayInCurrentMonth, todayDateStr, setSelectedMonthId, setSelectedDateStr]);

  const goToPrevDay = useCallback(() => {
    const currentDay = selectedDayNumber;
    if (currentDay > 1) {
      const prevDateStr = formatDayDateStr(
        currentMonthConfig.year,
        currentMonthConfig.month,
        currentDay - 1
      );
      setSelectedDateStr(prevDateStr);
    }
  }, [selectedDayNumber, currentMonthConfig, setSelectedDateStr]);

  const goToNextDay = useCallback(() => {
    const currentDay = selectedDayNumber;
    if (currentDay < currentMonthConfig.daysCount) {
      const nextDateStr = formatDayDateStr(
        currentMonthConfig.year,
        currentMonthConfig.month,
        currentDay + 1
      );
      setSelectedDateStr(nextDateStr);
    }
  }, [selectedDayNumber, currentMonthConfig, setSelectedDateStr]);

  return {
    data,
    profile: data.profile,
    theme: data.theme,
    setTheme,
    selectedMonthId,
    setSelectedMonthId,
    selectedDateStr,
    setSelectedDateStr,
    currentMonthConfig,
    currentMonthDays,
    monthStats,
    selectedDayNumber,
    activeDayConfig,
    activeDayData,
    dailySummary,
    toggleTask,
    setAllTasksForDay,
    updateProfile,
    resetMonthData,
    loadSampleData,
    exportData,
    importData,
    currentPage,
    setCurrentPage,
    todayDateStr,
    isTodayInCurrentMonth,
    goToToday,
    goToPrevDay,
    goToNextDay,
    celebrationActive,
  };
}
