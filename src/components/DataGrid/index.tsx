'use client';

import React, { useEffect, useState } from 'react';
import { DataGridToolbar, DataGridTable, DataGridPagination } from './components';
import { DataGridContext, DataGridProvider } from '@/context/DataGridProvider';
import { DATA_GRID } from '@/models/dataGrid';
import { SelectChangeEvent } from '@mui/material';

const DataGrid = (props: DATA_GRID) => {
	// const {
	// 	isLoading,
	// 	items,
	// 	selectedItems,
	// 	mainKey,
	// 	tableConfigs,
	// 	toolbar,
	// 	toolbarSlots = false,
	// 	table,
	// 	pagination = true,
	// } = props;

	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
		setPage(1);
		setItemsPerPage(parseInt(event.target.value));
	};

	return (
		<DataGridProvider props={props}>
			<DataGridContext.Consumer>
				{(context) => (
					<>
						{context?.isMounted && context.isUseLookUpTable.toolbar && (
							<DataGridToolbar
							// {...toolbar}
							// isLoading={isLoading}
							// items={items}
							// selectedItems={selectedItems}
							// tableConfigs={context.tableConfigs}
							// tableConfigsIsShow={context?.tableConfigsIsShow}
							// updateTableConfigsIsShow={context?.setTableConfigIsShow}
							/>
						)}
						{context?.isMounted && context.isUseLookUpTable.toolbarSlots}
						{context?.isMounted && (
							<DataGridTable
							// {...table}
							// isLoading={isLoading}
							// items={items}
							// itemsLookUpTable={context?.itemsLookUpTable}
							// mainKey={mainKey}
							// page={page}
							// itemsPerPage={itemsPerPage}
							// configs={context.tableConfigs.filter((config) => context?.tableConfigsFilter(config))}
							/>
						)}
						{context?.isMounted && context.isUseLookUpTable.pagination && (
							<DataGridPagination
							// items={items}
							// page={page}
							// itemsPerPage={itemsPerPage}
							// handleChangePage={handleChangePage}
							// handleChangeItemsPerPage={handleChangeItemsPerPage}
							/>
						)}
					</>
				)}
			</DataGridContext.Consumer>
		</DataGridProvider>
	);
};

export default DataGrid;
