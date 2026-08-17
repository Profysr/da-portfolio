"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const DockVisibilityContext = createContext({
  isHidden: false,
  setDockHidden: () => {},
});

export function DockVisibilityProvider({ children }) {
  const [isHidden, setIsHidden] = useState(false);

  const setDockHidden = useCallback((hidden) => {
    setIsHidden(hidden);
  }, []);

  return (
    <DockVisibilityContext.Provider value={{ isHidden, setDockHidden }}>
      {children}
    </DockVisibilityContext.Provider>
  );
}

export function useDockState() {
  return useContext(DockVisibilityContext);
}

export function useDockHide() {
  const ctx = useContext(DockVisibilityContext);
  return ctx ? ctx.setDockHidden : () => {};
}
