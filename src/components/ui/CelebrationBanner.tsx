import React from 'react';
import { Flame, Sparkles, CheckCircle2 } from 'lucide-react';

interface CelebrationBannerProps {
  isVisible: boolean;
  dateStr: string;
}

export const CelebrationBanner: React.FC<CelebrationBannerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-16 right-4 sm:right-8 z-50 animate-bounce duration-700">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-950 via-neutral-900 to-emerald-950 border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 text-white">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
        </div>
        <div>
          <div className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
            <span>100% — Day Complete 🔥</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <p className="text-xs text-neutral-300">
            All 8 compulsory tasks crushed today! Streak updated.
          </p>
        </div>
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      </div>
    </div>
  );
};
