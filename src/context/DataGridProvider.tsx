'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, ReactElement, useMemo } from 'react';
import { TABLE_CONFIG } from '@/models/tableConfig';
import { DATA_GRID, IS_USE_LOOK_UP_TABLE, DATA_GRID_TABLE_ACTION } from '@/models/dataGrid';
import { FILTER_CONDITIONS } from '@/models/filterConditions';
import { FilterConditionsUtils } from '@/utils';
import { useCheckIsUse } from '@/hooks';
import { SelectChangeEvent } from '@mui/material';
import { FILTER_CONFIG } from '@/models/filterConfig';

interface DataGridProvider {
	children: ReactElement;
	props: DATA_GRID;
}

interface DataGridContextProps {
	isMounted: boolean;
	isLoading: boolean;
	items: any[];
	mainKey: string | number;
	isUseLookUpTable: IS_USE_LOOK_UP_TABLE;
	tableConfigs: TABLE_CONFIG[];
	itemsLookUpTable: { [key: string]: string };
	tableConfigsIsShow: string[];
	setTableConfigIsShow: (configs: string[]) => void;
	tableConfigsFilter: (tableConfig: TABLE_CONFIG) => boolean;
	filterConditions: FILTER_CONDITIONS;
	updateFilterConditions: (arg: FILTER_CONDITIONS) => void;
	page: number;
	itemsPerPage: number;
	handleChangePage: (event: any, page: number) => void;
	handleChangeItemsPerPage: (props: any) => void;
	onSelect: (selectedItems: any[]) => void;
	rowDetails?: (props: any) => ReactNode;
	rowDetailsProps?: any;
	actions?: DATA_GRID_TABLE_ACTION[];
	selectedItems: any[];
	filteredItems: any[];
	filteredTableConfigs: TABLE_CONFIG[];
	filterConfigs?: FILTER_CONFIG[];
}

export const DataGridContext = createContext<DataGridContextProps | undefined>(undefined);

export const DataGridProvider = ({ children, props }: DataGridProvider) => {
	const { isLoading, items, selectedItems, mainKey, toolbar, toolbarSlots, table, pagination } = props;
	const {
		configs: tableConfigs,
		onSelect,
		stickyHeader,
		checkbox,
		sortable,
		rowDetails,
		rowDetailsProps,
		actions,
	} = table;
	const { columns, filters, exports } = toolbar || {};
	const { configs: filterConfigs } = filters || {};

	const itemsToCheck: { [key: string]: any } = {
		table: { itemToCheck: table, defaultUse: true },
		stickyHeader: { itemToCheck: stickyHeader, defaultUse: false },
		checkbox: { itemToCheck: checkbox, defaultUse: true },
		sortable: { itemToCheck: sortable, defaultUse: true },
		rowDetails: { itemToCheck: rowDetails, defaultUse: false },
		actions: { itemToCheck: actions, defaultUse: false },
		toolbar: { itemToCheck: toolbar, defaultUse: true },
		toolbarSlots: { itemToCheck: toolbarSlots, defaultUse: false },
		columns: { itemToCheck: columns, defaultUse: true },
		filters: { itemToCheck: filters, defaultUse: true },
		exports: { itemToCheck: exports, defaultUse: true },
		pagination: { itemToCheck: pagination, defaultUse: true },
	};

	const isUseLookUpTable = Object.keys(itemsToCheck).reduce((acc: any, key) => {
		acc[key] = useCheckIsUse(itemsToCheck[key]);
		return acc;
	}, {});

	const [isMounted, setIsMounted] = useState(false);
	const [itemsLookUpTable, setItemsLookUpTable] = useState<{ [key: string]: any }>({});
	const [tableConfigsIsShow, setTableConfigIsShow] = useState<string[]>([]);
	const [filterConditions, setFilterConditions] = useState<FILTER_CONDITIONS>({ logic: 'and', conditions: [] });
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
		setPage(1);
		setItemsPerPage(parseInt(event.target.value));
	};

	const tableConfigsFilter = (tableConfig: TABLE_CONFIG) => {
		return (
			tableConfigs.find(
				(config) => tableConfigsIsShow.includes(config.fieldKey) && config.fieldKey === tableConfig.fieldKey
			) !== undefined
		); // Use is undefined to check if a matching config isFound
	};

	const itemsArrayToSet = () => {
		const result = items.reduce((index, item) => {
			index[item[mainKey]] = item;
			return index;
		}, {});

		return result;
	};

	const updateFilterConditions = (newFilterConditions: FILTER_CONDITIONS) => {
		setFilterConditions((prev) => ({
			...prev,
			logic: newFilterConditions.logic,
			conditions: newFilterConditions.conditions,
		}));
	};

	const handleFilterItems = () => {
		const basicFiltered = FilterConditionsUtils.handleBasicFilter(filterConditions, items, mainKey);

		const filteredResult =
			filterConditions.logic === 'and'
				? FilterConditionsUtils.handleGetIntersectionFilter(basicFiltered)
				: FilterConditionsUtils.handleGetUnionFilter(basicFiltered);

		return filteredResult;
	};

	const handleFilterTableConfigs = (tableConfig: TABLE_CONFIG) => {
		return (
			tableConfigs.find(
				(config) => tableConfigsIsShow.includes(config.fieldKey) && config.fieldKey === tableConfig.fieldKey
			) !== undefined
		); // Use is undefined to check if a matching config isFound
	};

	const filteredTableConfigs = useMemo(() => {
		return tableConfigs.filter((config) => handleFilterTableConfigs(config));
	}, [tableConfigs, tableConfigsIsShow]);

	useEffect(() => {
		const tableConfigsIsShow = tableConfigs.reduce((acc, config) => {
			if (config.isShow) {
				acc.push(config.fieldKey);
			}
			return acc;
		}, [] as string[]);

		const itemsLookUpTable = itemsArrayToSet();

		if (filters) {
			const { configs: filterConfigs } = filters;
			const updatedFilterConditions = FilterConditionsUtils.generateNewLine({ filterConfigs, filterConditions });

			updateFilterConditions(updatedFilterConditions);
		}

		setTableConfigIsShow(tableConfigsIsShow);
		setItemsLookUpTable(itemsLookUpTable);
		setIsMounted(true);
	}, []);

	const filteredItems = useMemo(() => {
		const itemsLookUpTable = itemsArrayToSet();
		return handleFilterItems().map((mainKey: string | number) => itemsLookUpTable[mainKey]);
	}, [items, filterConditions]);

	const value: DataGridContextProps = {
		isMounted,
		isLoading,
		items,
		mainKey,
		isUseLookUpTable,
		page,
		itemsPerPage,
		onSelect,
		handleChangePage,
		handleChangeItemsPerPage,
		tableConfigs,
		itemsLookUpTable,
		tableConfigsIsShow,
		setTableConfigIsShow,
		tableConfigsFilter,
		filterConditions,
		updateFilterConditions,
		rowDetails,
		rowDetailsProps,
		actions,
		selectedItems,
		filteredItems,
		filteredTableConfigs,
		filterConfigs,
	};
	return <DataGridContext.Provider value={value}>{children}</DataGridContext.Provider>;
};

export const useDataGridContext = () => {
	const dataGridContextData = useContext(DataGridContext);

	if (dataGridContextData === undefined) {
		throw new Error('useDataGridContext must be used within a DataGridProvider');
	}

	return dataGridContextData;
};
