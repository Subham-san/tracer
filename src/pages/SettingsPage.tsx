import React, { useState, useRef } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Download,
  Upload,
  RotateCcw,
  User,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  FileJson,
} from 'lucide-react';
import { useTracker } from '../hooks/useTracker';
import { ConfirmModal } from '../components/modals/ConfirmModal';

interface SettingsPageProps {
  tracker: ReturnType<typeof useTracker>;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ tracker }) => {
  const {
    profile,
    updateProfile,
    theme,
    setTheme,
    selectedMonthId,
    currentMonthConfig,
    resetMonthData,
    exportData,
    importData,
    loadSampleData,
  } = tracker;

  // Form states for profile editing
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [currentFocus, setCurrentFocus] = useState(profile.currentFocus);
  const [longTermGoal, setLongTermGoal] = useState(profile.longTermGoal);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Reset modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      role,
      currentFocus,
      longTermGoal,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleConfirmReset = () => {
    resetMonthData(selectedMonthId);
    setShowResetModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importData(content);
        if (success) {
          setImportStatus('Data successfully restored!');
        } else {
          setImportStatus('Invalid backup file. Restoration failed.');
        }
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-4xl mx-auto pb-16">
      {/* Settings Top Banner */}
      <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Settings &amp; Preferences
            </h1>
            <p className="text-xs text-neutral-400">
              Manage profile details, theme appearance, backups, and tracker rules.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Theme & Appearance */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
          {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          Theme &amp; Appearance
        </h2>

        <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
          <div>
            <span className="text-sm font-semibold text-white block">Visual Theme</span>
            <span className="text-xs text-neutral-400">
              Switch between Dark-Mode First (recommended) and Light Mode.
            </span>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                theme === 'dark'
                  ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                theme === 'light'
                  ? 'bg-neutral-800 text-amber-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. User Profile Editor */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            User Profile &amp; Ambitions
          </h2>
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> Changes saved!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">
              Student / Current Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">
              Current Engineering Focus
            </label>
            <input
              type="text"
              value={currentFocus}
              onChange={(e) => setCurrentFocus(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">
              Long-term Career Goal
            </label>
            <textarea
              rows={2}
              value={longTermGoal}
              onChange={(e) => setLongTermGoal(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none resize-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition cursor-pointer shadow-md shadow-emerald-500/20"
          >
            Save Profile
          </button>
        </div>
      </form>

      {/* 3. Task Schedule Architecture Reference */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Task Schedule &amp; System Rules
        </h2>

        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3 text-xs text-neutral-300 leading-relaxed">
          <div className="font-semibold text-white flex items-center gap-2">
            <span>Rules for {currentMonthConfig.name}:</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-neutral-400">
            <li><strong className="text-neutral-200">Total Compulsory Tasks = 8 per day:</strong> Bathing, Meal 7 AM, Meal 11 AM, Meal 4 PM, Meal 9 PM, Study 3H, Online Internship, plus that day's scheduled career task.</li>
            <li><strong className="text-neutral-200">Career Schedule:</strong> Monday, Tuesday, Wednesday = Web Development. Thursday, Friday, Saturday, Sunday = Game Development.</li>
            <li><strong className="text-neutral-200">Valorant:</strong> Completely optional. Never counts against or inflates completion percentage.</li>
            <li><strong className="text-neutral-200">Streak System:</strong> Increments by 1 only when 100% of the 8 compulsory tasks are checked. Any missed compulsory task breaks the streak.</li>
            <li><strong className="text-neutral-200">November 2026 Ready:</strong> Architecture supports custom exam-routine schema when examination timetable begins.</li>
          </ul>
        </div>
      </div>

      {/* 4. Data Export, Import & Demo Seeder */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
          <FileJson className="w-4 h-4 text-emerald-400" />
          Data Backup &amp; Portability
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Export */}
          <button
            type="button"
            onClick={exportData}
            className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 text-left transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                Export Progress
              </span>
              <Download className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition" />
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">
              Download your complete tracking history as a JSON backup file.
            </p>
          </button>

          {/* Import */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 text-left transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition">
                Import Backup
              </span>
              <Upload className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition" />
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">
              Restore previously saved tracking data from a JSON file.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </button>

          {/* Load Demo Week */}
          <button
            type="button"
            onClick={loadSampleData}
            className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 text-left transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                Preview Sample Week
              </span>
              <Sparkles className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 transition" />
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">
              Populate realistic early October data to explore charts &amp; streaks.
            </p>
          </button>
        </div>

        {importStatus && (
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-semibold text-emerald-400">
            {importStatus}
          </div>
        )}
      </div>

      {/* 5. Danger Zone: Reset Month */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-rose-500/20 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          Danger Zone
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-rose-950/10 border border-rose-500/20">
          <div>
            <span className="text-sm font-bold text-white block">
              Reset {currentMonthConfig.name} Progress
            </span>
            <span className="text-xs text-neutral-400 mt-0.5 block">
              Clears all checked tasks for {currentMonthConfig.name}. This action requires confirmation.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 text-rose-300 hover:text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset {currentMonthConfig.name}</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        title={`Reset ${currentMonthConfig.name}?`}
        message={`Are you sure? This will delete all ${currentMonthConfig.name} progress. This action cannot be undone.`}
        confirmText="Yes, Delete Progress"
        cancelText="Keep Data"
        isDestructive={true}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
};
