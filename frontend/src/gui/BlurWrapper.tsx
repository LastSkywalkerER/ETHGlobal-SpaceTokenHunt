import { FC, ReactNode } from "react";
import { GuiButton } from "./GuiButton";

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
      <div className="blur w-full h-full">{children}</div>
      {modalContent && (
        <div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          {onClose &&
            <GuiButton
              className={"absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 z-10 !py-1 !px-2"}
              onClick={onClose}>X</GuiButton>}
          {modalContent}
        </div>
      )}
    </>
  );
};