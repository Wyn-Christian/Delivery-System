import { createContext, useContext } from "react";

export const PortsContext = createContext();

export const usePorts = () => useContext(PortsContext);

export const PortsProvider = ({ children }) => {
  const ports = {
    PORT: 5000,
    SERVER_PORT: 5001,
    BAKERY_SERVER_PORT: 4001,
  };
  return (
    <PortsContext.Provider value={ports}>{children}</PortsContext.Provider>
  );
};
