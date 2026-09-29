/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTracker } from './hooks/useTracker';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { CelebrationBanner } from './components/ui/CelebrationBanner';
import { DashboardPage } from './pages/DashboardPage';
import { DailyTasksPage } from './pages/DailyTasksPage';
import { CalendarPage } from './pages/CalendarPage';
import { CareerPage } from './pages/CareerPage';
import { StudyPage } from './pages/StudyPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const tracker = useTracker();
  const {
    currentPage,
    setCurrentPage,
    currentMonthConfig,
    setSelectedMonthId,
    selectedDateStr,
    todayDateStr,
    isTodayInCurrentMonth,
    goToToday,
    theme,
    setTheme,
    monthStats,
    profile,
    celebrationActive,
  } = tracker;

  // Render current page content
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage tracker={tracker} />;
      case 'tasks':
        return <DailyTasksPage tracker={tracker} />;
      case 'calendar':
        return <CalendarPage tracker={tracker} />;
      case 'career':
        return <CareerPage tracker={tracker} />;
      case 'study':
        return <StudyPage tracker={tracker} />;
      case 'statistics':
        return <StatisticsPage tracker={tracker} />;
      case 'settings':
        return <SettingsPage tracker={tracker} />;
      default:
        return <DashboardPage tracker={tracker} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col lg:flex-row font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 100% Completion Subtle Celebration Banner */}
      <CelebrationBanner isVisible={celebrationActive} dateStr={selectedDateStr} />

      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        currentMonth={currentMonthConfig}
        onSelectMonth={setSelectedMonthId}
        currentStreak={monthStats.currentStreak}
        profile={profile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header
          profile={profile}
          currentMonth={currentMonthConfig}
          selectedDateStr={selectedDateStr}
          todayDateStr={todayDateStr}
          isTodayInCurrentMonth={isTodayInCurrentMonth}
          onGoToToday={goToToday}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          currentStreak={monthStats.currentStreak}
          perfectDaysCount={monthStats.perfectDaysCount}
          onOpenSettings={() => setCurrentPage('settings')}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />

        {/* Scrollable Viewport Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
        </main>

        {/* Mobile Bottom Navigation Bar (hidden on lg screens) */}
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}
