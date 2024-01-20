import React from "react";

import { GuiCard } from "../../GuiCard";

export const PageLoader: React.FC = () => {
  return (
    <div className="z-50 fixed top-0 left-0 flex justify-center items-center w-full h-full">
      <div className="absolute bg-black opacity-70 top-0 left-0 w-full h-full" />
      <GuiCard className="w-[420px] bg-whitelabel-main-800 rounded-large py-64 px-40 flex flex-col items-center justify-center mx-20 z-10">
        Loading...
      </GuiCard>
    </div>
  );
};
