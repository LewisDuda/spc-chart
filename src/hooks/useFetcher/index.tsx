import { useState, useCallback, useMemo } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { SnackbarMessage } from '@/components';

interface UseAxiosConfig extends AxiosRequestConfig {
	initialData?: any;
	title?: string;
	method?: string;
}

interface UseFetcherResult<T> {
	resData: T | null;
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
	refetch: (config?: UseAxiosConfig) => void;
	fetchData: (config?: UseAxiosConfig) => void;
	handleFetch: (config: UseAxiosConfig) => Promise<void>;
}

const axiosInstance: AxiosInstance = axios.create({
	baseURL: 'http://localhost:8888',
});

const useFetcher = <T = any,>(initialConfig: UseAxiosConfig = {}): UseFetcherResult<T> => {
	const { initialData = null, ...config } = initialConfig;
	const [state, setState] = useState({
		resData: initialData,
		isLoading: false,
		isError: false,
		errorMessage: '',
	});

	const handleFetch = useCallback(async (fetchConfig: UseAxiosConfig) => {
		setState((prev) => ({ ...prev, isLoading: true, isError: false }));
		try {
			const response: AxiosResponse<T> = await axiosInstance(fetchConfig);
			setState((prev) => ({ ...prev, resData: response.data }));

			const method = fetchConfig.method?.toUpperCase();
			if (method && ['POST', 'PUT', 'DELETE'].includes(method)) {
				const title = fetchConfig.title || 'Operation successful';
				const message = <SnackbarMessage title={title} method={method} />;
				enqueueSnackbar(message, {
					variant: 'success',
					autoHideDuration: 2000,
				});
			}
		} catch (error) {
			const errorMsg = (error as any).response?.data?.msg || 'An error occurred';
			setState((prev) => ({ ...prev, isError: true, errorMessage: (error as Error).message }));

			const method = fetchConfig.method?.toUpperCase();
			if (method && ['POST', 'PUT', 'DELETE'].includes(method)) {
				const title = fetchConfig.title || 'Operation failed';
				const message = <SnackbarMessage title={title} method={method} description={errorMsg} />;
				enqueueSnackbar(message, {
					variant: 'error',
					autoHideDuration: 5000,
				});
			}
		} finally {
			setState((prev) => ({ ...prev, isLoading: false }));
		}
	}, []);

	const fetchData = useMemo(
		() => (fetchConfig?: UseAxiosConfig) => {
			handleFetch({ ...config, ...fetchConfig });
		},
		[config, handleFetch]
	);

	const { resData, isLoading, isError, errorMessage } = state;

	return { resData, isLoading, isError, errorMessage, refetch: fetchData, handleFetch, fetchData };
};

export default useFetcher;
