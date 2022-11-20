import React, { createContext, useContext, useState } from "react";

interface IContext {
  selectedIndexMenu: number;
  setSelectedIndexMenu: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<IContext>({} as IContext);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de AppProvider");
  }

  return context;
}

export function AppProvider(props: any) {
  const { children } = props;
  const [selectedIndexMenu, setSelectedIndexMenu] = useState(0);

  return (
    <AppContext.Provider
      value={{
        selectedIndexMenu,
        setSelectedIndexMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
