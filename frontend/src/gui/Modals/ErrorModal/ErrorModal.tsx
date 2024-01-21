import React from "react";

import { GuiButton } from "../../GuiButton";
import { GuiCard } from "../../GuiCard";
import { aaveErrorMessages } from "./aaveErrorMapping";
import { ModalProps } from "./types";

const ErrorModal: React.FC<ModalProps> = ({ error, onClose }) => {
  const capitalizeFirstLetter = (string: string | string[]) => {
    const newString = Array.isArray(string) ? string.join(", ") : string;

    return newString.charAt(0).toUpperCase() + newString.slice(1);
  };

  const getErrorText = () => {
    if (error.reason) {
      return capitalizeFirstLetter(error.reason);
    }

    if (error.message && error.message.includes(`Cause: {"code":-`)) {
      return error.message.slice(
        error.message.indexOf(`"message":"`) + 11,
        error.message.indexOf(`","stack":"`),
      );
    }

    if (error.message && error.message.indexOf(`TRANSACTION INFORMATION`) !== -1) {
      return (
        <>
          Something went wrong.
          <br />
          <br />
          {error.message
            .slice(
              error.message.indexOf(`TRANSACTION INFORMATION`) + 54,
              error.message.indexOf(`DEBUGGING RESOURCES`) - 28,
            )

            .split("<br />")
            .map((string: string) => (
              <>
                {string}
                <br />
              </>
            ))}
        </>
      );
    }

    const aaveCode =
      "Execution reverted: 36".includes("Execution reverted: ") &&
      parseInt("Execution reverted: 36".replace("Execution reverted: ", ""));

    if (aaveCode) {
      return aaveErrorMessages[aaveCode];
    }

    return capitalizeFirstLetter(error.message || "Something went wrong");
  };

  return (
    <div className="z-50 fixed top-0 left-0 flex justify-center items-center w-full h-full">
      <div className="absolute bg-black opacity-70 top-0 left-0 w-full h-full" />
      <GuiCard className="z-50 w-[500px] min-h-[300px] flex flex-col items-center justify-between bg-whitelabel-main-800 rounded-large animate-fade-in p-40 mx-20">
        <div className="text-p1 w-full text-vitreus-luminous-green text-center overflow-hidden relative inline-block text-ellipsis nowrap">
          {getErrorText()}
        </div>

        <GuiButton className="w-1/2 mt-20" onClick={onClose}>
          Got it
        </GuiButton>
      </GuiCard>
    </div>
  );
};

export default ErrorModal;
