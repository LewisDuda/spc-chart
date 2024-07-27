'use client';

import React, { createContext, useContext, useState, useEffect, useRef, FC, ReactNode } from 'react';
import { GET_CHARTS_DEFINITIONS, POST_CHART_DEFINITIONS } from '@/services/chartsDefinitions';
import { ADD_CONTENT_INTERFACE } from '@/models/chartsDefinitions';

interface AppContextProps {
	chartsDefinitionsData: any[];
	getChartsDefinitionsData: () => Promise<void>;
	addChartDefinitionsData: (addChartDefinitionsData: ADD_CONTENT_INTERFACE) => Promise<void>;
	chartsDefinitionsStatus: {
		brief: string | 'idle' | 'loading' | 'succeed' | 'failed';
		title?: string;
		method?: string;
		description?: string | null;
	};
	initChartsDefinitionsStatus: () => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
<<<<<<< HEAD
	const value: AppContextProps = {};
=======
	const [chartsDefinitionsData, setChartsDefinitionsData] = useState([]);
	const [chartsDefinitionsStatus, setChartsDefinitionsStatus] = useState({ brief: 'idle' });

	const getChartsDefinitionsData = async () => {
		const result = await GET_CHARTS_DEFINITIONS();

		if (result.status === 200) {
			setChartsDefinitionsStatus((prev) => ({
				...prev,
				brief: 'succeed',
				title: 'Charts Definition',
				method: 'GET',
			}));
			setChartsDefinitionsData(result.data);
		} else if (result.status === 400) {
			setChartsDefinitionsStatus((prev) => ({
				...prev,
				brief: 'failed',
				title: 'Charts Definition',
				method: 'GET',
				description: result.data,
			}));
		} else {
			console.log('Unknown mistake');
		}
	};

	const addChartDefinitionsData = async (addChartDefinitionsData: ADD_CONTENT_INTERFACE) => {
		const result = await POST_CHART_DEFINITIONS(addChartDefinitionsData);

		if (result.status === 201) {
			setChartsDefinitionsStatus((prev) => ({
				...prev,
				brief: 'succeed',
				title: 'Charts Definition',
				method: 'ADD',
			}));
			await getChartsDefinitionsData();
		} else if (result.status === 400) {
			setChartsDefinitionsStatus((prev) => ({
				...prev,
				brief: 'failed',
				title: 'Charts Definition',
				method: 'ADD',
				description: result.data,
			}));
		} else {
			console.log('Unknown mistake');
		}
	};

	const initChartsDefinitionsStatus = () => {
		setChartsDefinitionsStatus((prev) => ({
			...prev,
			brief: 'idle',
			title: '',
			method: '',
			description: '',
		}));
	};

	const value: AppContextProps = {
		chartsDefinitionsData,
		getChartsDefinitionsData,
		addChartDefinitionsData,
		chartsDefinitionsStatus,
		initChartsDefinitionsStatus,
	};
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const appContextData = useContext(AppContext);

	if (appContextData === undefined) {
		throw new Error('useAppContext must be used within a AppProvider');
	}

	return appContextData;
};
