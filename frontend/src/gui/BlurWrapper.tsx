import { FC, ReactNode } from "react";

export const BlurWrapper: FC<{
  children: ReactNode | ReactNode[] | null;
  modalContent?: ReactNode | ReactNode[] | null;
  isShow?: boolean;
  onClose?: () => void;
}> = ({ children, modalContent, isShow, onClose }) => {
  if (!isShow) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="pointer-events-none h-full w-full blur-sm">{children}</div>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-space-950/70 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        {modalContent && (
          <div className="relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
            {onClose && (
              <button
                onClick={onClose}
                className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-space-800 text-white/70 transition-colors hover:border-neon-red/50 hover:text-neon-red"
                aria-label="Close"
              >
                ✕
              </button>
            )}
            {modalContent}
          </div>
        )}
      </div>
    </>
  );
};
