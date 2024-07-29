'use client';

import React, { createContext, useContext, useState, useEffect, useRef, FC, ReactNode } from 'react';

interface AppContextProps {}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
	const value: AppContextProps = {};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const appContextData = useContext(AppContext);

	if (appContextData === undefined) {
		throw new Error('useAppContext must be used within a AppProvider');
	}

	return appContextData;
};
