import React from "react";

import { GuiButton } from "../../GuiButton";
import { type ModalProps } from "./types";

export const SuccessModal: React.FC<ModalProps> = ({ onClose, text, title }) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
      <div className="absolute left-0 top-0 h-full w-full bg-space-950/80 backdrop-blur-sm" />
      <div className="glass z-10 mx-5 flex w-[420px] flex-col items-center px-10 py-12 animate-fade-in">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-neon-green/40 bg-neon-green/10 text-2xl text-neon-green shadow-[0_0_24px_-4px_rgba(134,255,0,0.6)]">
          ✓
        </div>
        <span className="mb-2 text-center font-display text-xl font-bold text-white">
          {title || "Success"}
        </span>
        {text && <span className="mb-7 text-center text-sm text-white/60">{text}</span>}
        <GuiButton className="mt-2 w-1/2" onClick={onClose}>
          Close
        </GuiButton>
      </div>
    </div>
  );
};
