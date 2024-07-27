import React, { ReactElement, ReactNode } from 'react';
import { TABLE_CONFIG } from '@/models/tableConfig';
import { FILTER_CONFIG } from '@/models/filterConfig';

export interface DATA_GRID {
	isLoading: boolean;
<<<<<<< HEAD
	isError: boolean;
	errorStatus: any;
=======
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
	items: any[];
	selectedItems: any[];
	mainKey: string | number;
	toolbar?: DATA_GRID_TOOLBAR;
	toolbarSlots?: ReactElement;
	table: DATA_GRID_TABLE;
	pagination?: boolean;
}

export interface DATA_GRID_TOOLBAR {
	columns?: boolean;
	filters?: { configs: FILTER_CONFIG[] };
	exports?: boolean;
}

export interface DATA_GRID_TABLE {
	configs: TABLE_CONFIG[];
	onSelect: (selectedItems: any[]) => void;
	stickyHeader?: boolean;
	checkbox?: boolean;
	sortable?: boolean;
	rowDetails?: (props: any) => ReactNode;
	rowDetailsProps?: any;
	actions?: DATA_GRID_TABLE_ACTION[];
}

export interface IS_USE_LOOK_UP_TABLE {
	table: boolean;
	stickyHeader: boolean;
	checkbox: boolean;
	sortable: boolean;
	rowDetails: boolean;
	rowDetailsProps: boolean;
	actions: boolean;
	toolbar: boolean;
	toolbarSlots: boolean;
	columns: boolean;
	filters: boolean;
	exports: boolean;
	pagination: boolean;
}

export type Order = 'asc' | 'desc' | '-';

export interface DATA_GRID_TABLE_ACTION {
	label: ReactNode;
	func: (props: ROW_ACTION_FUNC_PROPS) => void;
	disabled?: boolean;
	disabledFunc?: (item: any) => boolean;
	hidden?: boolean;
	hiddenFunc?: (item: any) => boolean;
}

export interface ROW_ACTION_FUNC_PROPS {
	item: any;
	handleCloseMenu: () => void;
}
