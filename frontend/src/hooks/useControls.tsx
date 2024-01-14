import { createContext, FC, ReactElement } from "react";

const ControlsContext = createContext({});

export const ConctrolsProvider: FC<{ children: ReactElement | ReactElement[] }> = ({
  children,
}) => {
  return <ControlsContext.Provider value={{}}>{children}</ControlsContext.Provider>;
};
