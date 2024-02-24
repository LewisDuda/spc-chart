import React, { createContext, useContext, useState, useEffect, useRef, FC, ReactNode } from 'react';

interface AppContextProps {}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
	const [chartsDefinitionsData, setChartsDefinitionsData] = useState([]);

	const getChartsDefinitionsData = () => {};

	const value: AppContextProps = {};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
