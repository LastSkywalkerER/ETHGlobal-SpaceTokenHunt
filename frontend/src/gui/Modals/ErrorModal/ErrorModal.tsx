import React from "react";

import { GuiButton } from "../../GuiButton";
import { resolveFriendlyError } from "./friendlyErrors";
import { ModalProps } from "./types";

const ErrorModal: React.FC<ModalProps> = ({ error, onClose }) => {
  const { title, message, hint } = resolveFriendlyError(error);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
      <div className="absolute left-0 top-0 h-full w-full bg-space-950/80 backdrop-blur-sm" />
      <div className="glass z-10 mx-5 flex w-[500px] max-w-[92vw] flex-col items-center px-10 py-10 animate-fade-in">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-neon-red/40 bg-neon-red/10 text-2xl text-neon-red shadow-[0_0_24px_-4px_rgba(255,77,109,0.6)]">
          !
        </div>
        <span className="mb-3 text-center font-display text-lg font-bold text-white">{title}</span>
        <p className="max-h-[30vh] w-full overflow-auto break-words text-center text-sm text-white/70">
          {message}
        </p>

        {hint && (
          <div className="mt-5 w-full rounded-lg border border-neon-cyan/25 bg-neon-cyan/5 px-4 py-3 text-center text-sm text-neon-cyan/90">
            <span className="font-semibold">💡 How to fix: </span>
            {hint}
          </div>
        )}

        <GuiButton className="mt-8 w-1/2" onClick={onClose}>
          Got it
        </GuiButton>
      </div>
    </div>
  );
};

export default ErrorModal;
