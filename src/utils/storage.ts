import { UserProfile, DayRecord } from '../types/tracker';

const STORAGE_KEY = 'subham_productivity_tracker_v1';

export interface StoredTrackerData {
  version: number;
  profile: UserProfile;
  theme: 'dark' | 'light';
  selectedMonthId: string;
  selectedDateStr: string;
  months: {
    [monthId: string]: {
      days: Record<string, DayRecord>;
    };
  };
}

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Subham Nayak',
  role: 'BCA Student',
  institution: 'BCA College',
  currentFocus: 'Web Development + Game Development',
  longTermGoal: 'Get a good internship and eventually work at a good/big company in either web development or game development.',
  interests: ['Video editing', 'Gaming', 'Building projects from scratch'],
  dailyFreeHours: 5,
};

export const INITIAL_DATA: StoredTrackerData = {
  version: 1,
  profile: DEFAULT_PROFILE,
  theme: 'dark',
  selectedMonthId: '2026-10',
  selectedDateStr: '2026-10-01',
  months: {
    '2026-10': {
      days: {},
    },
  },
};

/**
 * Loads data from localStorage safely
 */
export function loadTrackerData(): StoredTrackerData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_DATA;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        ...INITIAL_DATA,
        ...parsed,
        profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
        months: parsed.months || { '2026-10': { days: {} } },
      };
    }
  } catch (error) {
    console.error('Failed to load tracker data from localStorage:', error);
  }
  return INITIAL_DATA;
}

/**
 * Saves data to localStorage
 */
export function saveTrackerData(data: StoredTrackerData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save tracker data to localStorage:', error);
  }
}

/**
 * Exports data as a downloadable JSON file
 */
export function exportDataAsJson(data: StoredTrackerData, filename = 'subham-life-tracker-backup.json'): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Parses and validates imported JSON data
 */
export function validateImportedData(rawJson: string): StoredTrackerData | null {
  try {
    const parsed = JSON.parse(rawJson);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    // Basic structure validation
    const months = parsed.months || {};
    const profile = {
      ...DEFAULT_PROFILE,
      ...(parsed.profile || {}),
    };

    return {
      version: parsed.version || 1,
      profile,
      theme: parsed.theme === 'light' ? 'light' : 'dark',
      selectedMonthId: parsed.selectedMonthId || '2026-10',
      selectedDateStr: parsed.selectedDateStr || '2026-10-01',
      months,
    };
  } catch (err) {
    console.error('Error parsing JSON backup file:', err);
    return null;
  }
}

/**
 * Seeds sample realistic week data if user wants to preview
 */
export function generateSampleWeekData(): Record<string, DayRecord> {
  const sample: Record<string, DayRecord> = {};
  
  // Let's seed Oct 1 to Oct 4 as completed to demonstrate streaks and stats
  // Oct 1 (Thu, GameDev) - 100%
  sample['2026-10-01'] = {
    bathing: true,
    meal7: true,
    meal11: true,
    meal4: true,
    meal9: true,
    study: true,
    internship: true,
    gameDev: true,
    valorant: true,
  };

  // Oct 2 (Fri, GameDev) - 100%
  sample['2026-10-02'] = {
    bathing: true,
    meal7: true,
    meal11: true,
    meal4: true,
    meal9: true,
    study: true,
    internship: true,
    gameDev: true,
    valorant: false,
  };

  // Oct 3 (Sat, GameDev) - 100%
  sample['2026-10-03'] = {
    bathing: true,
    meal7: true,
    meal11: true,
    meal4: true,
    meal9: true,
    study: true,
    internship: true,
    gameDev: true,
    valorant: true,
  };

  // Oct 4 (Sun, GameDev) - 100%
  sample['2026-10-04'] = {
    bathing: true,
    meal7: true,
    meal11: true,
    meal4: true,
    meal9: true,
    study: true,
    internship: true,
    gameDev: true,
    valorant: false,
  };

  // Oct 5 (Mon, WebDev) - 75% in progress (6 of 8)
  sample['2026-10-05'] = {
    bathing: true,
    meal7: true,
    meal11: true,
    meal4: true,
    study: true,
    internship: true,
    webDev: false,
    meal9: false,
    valorant: false,
  };

  return sample;
}
