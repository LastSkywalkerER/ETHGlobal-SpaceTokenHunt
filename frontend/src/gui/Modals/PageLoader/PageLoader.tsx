import React from "react";

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
      <div className="absolute left-0 top-0 h-full w-full bg-space-950/80 backdrop-blur-sm" />
      <div className="glass z-10 mx-5 flex w-[360px] flex-col items-center justify-center gap-6 px-10 py-14 animate-fade-in">
        <div className="h-12 w-12 rounded-full border-2 border-white/10 border-t-neon-cyan animate-spin-slow" />
        <span className="font-display text-sm uppercase tracking-[0.25em] text-white/70">
          Loading
        </span>
      </div>
    </div>
  );
};
