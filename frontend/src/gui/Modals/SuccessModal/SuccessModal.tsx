import React from "react";

import { GuiButton } from "../../GuiButton";
import { type ModalProps } from "./types";

export const SuccessModal: React.FC<ModalProps> = ({ onClose, text, title }) => {
  return (
    <div className="z-50 fixed top-0 left-0 flex justify-center items-center w-full h-full">
      <div className="absolute bg-black opacity-70 top-0 left-0 w-full h-full" />
      <div className="w-[420rem] bg-whitelabel-main-800 rounded-large py-64 px-40 flex flex-col items-center mx-20 z-10">
        <span className="text-sh2 text-vitreus-luminous-green my-16 text-center">
          {title || "Success"}
        </span>
        {text && <span className="text-p1 text-gray mb-60 text-center">{text}</span>}
        <GuiButton onClick={onClose}>Close</GuiButton>
      </div>
    </div>
  );
};
