'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Order } from '@/models/dataGrid';
import { TableProgress, ContextMenu } from '@/components';
import { Row, CheckboxOfAll, RowMenuList } from './components';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WarningIcon from '@mui/icons-material/Warning';
import { useDataGridContext } from '@/context/DataGridProvider';

const DataGridTable = () => {
	const {
		isLoading,
		isError,
		errorStatus,
		mainKey,
		filteredItems: items,
		itemsLookUpTable,
		filteredTableConfigs: tableConfigs,
		isUseLookUpTable,
		page,
		itemsPerPage,
		onSelect,
	} = useDataGridContext();
	const { checkbox: isUseCheckbox, sortable: isUseSort, stickyHeader: isUseStickyHeader } = isUseLookUpTable;

	const [selectedItems, setSelectedItems] = useState<any[]>([]);
	const [isSelectedPageOfAll, setIsSelectedPageOfAll] = useState(false);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const [pageStartItemIndex, setPageStartItemIndex] = useState(page * itemsPerPage);
	const [pageEndItemIndex, setPageEndItemIndex] = useState(page * itemsPerPage + itemsPerPage);
	const [order, setOrder] = useState<Order>('-');
	const [orderBy, setOrderBy] = useState('');

	const handleSelectOneRow = (event: any, itemOfMainKey: string | number) => {
		let updateSelectedItems = [];

		if (event.target.checked) {
			updateSelectedItems = [...selectedItems, itemOfMainKey];
		} else {
			updateSelectedItems = selectedItems.filter((item) => item !== itemOfMainKey);
		}
		//Query itemsLookUpTable to obtain the completed object of selected items
		const updateSelectedItemsToObject = updateSelectedItems.map((mainKey) => itemsLookUpTable[mainKey]);

		setSelectedItems(updateSelectedItems);
		onSelect(updateSelectedItemsToObject);
	};

	const handleChangeSelectAll = (type: string) => {
		if (type === 'all') {
			const selectedAll = items.map((item) => item[mainKey]);
			setSelectedItems(selectedAll);
			onSelect(items);
		} else if (type === 'onePage') {
			const pageItems = items.slice(pageStartItemIndex, pageEndItemIndex);
			const selectedPageOfAll = pageItems.map((item) => item[mainKey]);
			// Use Set to store selected items and new values, and automatically filter duplicate values ​​through Set's uniqueness
			const selectedItemsSet = new Set([...selectedItems, ...selectedPageOfAll]);
			// Convert Set back to Array
			const result = Array.from(selectedItemsSet);
			// Query itemsLookUpTable to obtain the completed object of selected items
			const resultToObject = result.map((mainKey) => itemsLookUpTable[mainKey]);

			setSelectedItems(result);
			onSelect(resultToObject);
		} else if (type === 'cancel') {
			setSelectedItems([]);
			onSelect([]);
		}
	};
	const handleSort = (event: React.MouseEvent<unknown>, property: string) => {
		let updateOrder: Order = '-';
		let updateProperty = '';

		if (orderBy === property) {
			if (order === 'asc') {
				// asc to desc
				updateOrder = 'desc';
				updateProperty = property;
			} else {
				// desc to origin
				updateOrder = '-';
				updateProperty = '';
			}
		} else {
			// origin to asc
			updateOrder = 'asc';
			updateProperty = property;
		}

		setOrder(updateOrder);
		setOrderBy(updateProperty);
	};

	const visibleItems =
		useMemo(() => {
			const SortFunction = tableConfigs.find((config) => config.fieldKey === orderBy)?.sort;

			if (order === '-') {
				return items.slice(pageStartItemIndex, pageEndItemIndex);
			} else if (order === 'asc') {
				return items.slice().sort(SortFunction).slice(pageStartItemIndex, pageEndItemIndex);
			} else if (order === 'desc') {
				return items.slice().sort(SortFunction).reverse().slice(pageStartItemIndex, pageEndItemIndex);
			}
		}, [items, order, orderBy, pageStartItemIndex, pageEndItemIndex, itemsPerPage]) || [];

	useEffect(() => {
		setPageStartItemIndex((page - 1) * itemsPerPage);
		setPageEndItemIndex((page - 1) * itemsPerPage + itemsPerPage);
	}, [page, itemsPerPage]);

	useEffect(() => {
		if (!isLoading) {
			const isPageFullySelected = () => {
				const pageItems = items.slice(pageStartItemIndex, pageEndItemIndex);
				return pageItems.every((item) => selectedItems.includes(item[mainKey]));
			};

			const isSelectedAll = selectedItems.length === items.length;
			const isSelectedPageOfAll = isPageFullySelected();
			setIsSelectedAll(isSelectedAll);
			setIsSelectedPageOfAll(isSelectedPageOfAll);
		}
	}, [selectedItems, pageStartItemIndex, pageEndItemIndex]);

	// const uniqueIdIndex = items.reduce((index, item) => {
	// 	index[item.id] = item;
	// 	return index;
	// }, {});

	// console.log(uniqueIdIndex);

	// const result = selectedItems.map((id) => uniqueIdIndex[id]);

	// console.log(result);
	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
		item: any;
	} | null>(null);

	const handleContextMenu = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, item: any) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
						mouseY: event.clientY - 6,
						mouseX: event.clientX + 2,
						item: item,
				  }
				: null
		);
	};

	return (
		<React.Fragment>
			{contextMenu && (
				<ContextMenu
					anchorPosition={{ mouseY: contextMenu.mouseY, mouseX: contextMenu.mouseX }}
					handleClose={() => setContextMenu(null)}
					menuOptions={<RowMenuList item={contextMenu.item} handleCloseMenu={() => setContextMenu(null)} />}
				/>
			)}

			<div className="max-h-[85%] max-w-full overflow-auto border border-gray border-b-0 rounded-t-md  lg:max-h-[75%]">
				<Table stickyHeader={isUseStickyHeader}>
					<TableHead>
						<TableRow>
							{isUseCheckbox && (
								<TableCell>
									<CheckboxOfAll
										isError={isError}
										isItemsEmpty={items.length === 0}
										isSelectedAll={isSelectedAll && items.length !== 0}
										isSelectedPageOfAll={isSelectedPageOfAll && items.length !== 0}
										handleChangeSelectAll={handleChangeSelectAll}
									/>
								</TableCell>
							)}
							<TableCell
								className={`${isUseSort ? 'cursor-pointer select-none' : ' cursor-auto'}`}
								onClick={(event) => handleSort(event, tableConfigs[0].fieldKey)}
							>
								<div className="flex items-center gap-2">
									<div className="pl-3">{tableConfigs[0].fieldValue}</div>
									{order === 'asc' && orderBy === tableConfigs[0].fieldKey ? (
										<SignalCellularAltIcon className="text-base rotate-90" />
									) : order === 'desc' && orderBy === tableConfigs[0].fieldKey ? (
										<SignalCellularAltIcon className="text-base -rotate-90" />
									) : (
										<div className="w-4"></div> // fill space when not sorting
									)}
								</div>
							</TableCell>
							{tableConfigs.slice(1).map((config, index) => (
								<TableCell
									key={index}
									className={`${isUseSort ? ' cursor-pointer select-none' : ' cursor-auto'}`}
									onClick={(event) => handleSort(event, config.fieldKey)}
								>
									<div className="flex whitespace-nowrap items-center gap-2">
										<div>{config.fieldValue}</div>
										{order === 'asc' && orderBy === config.fieldKey ? (
											<SignalCellularAltIcon className="text-base rotate-90" />
										) : order === 'desc' && orderBy === config.fieldKey ? (
											<SignalCellularAltIcon className="text-base -rotate-90" />
										) : (
											<div className="w-4"></div> // fill space when not sorting
										)}
									</div>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading && (
							<TableRow>
								<TableCell colSpan={isUseCheckbox ? tableConfigs.length + 1 : tableConfigs.length}>
									<TableProgress />
								</TableCell>
							</TableRow>
						)}
						{isError && (
							<TableRow>
								<TableCell colSpan={isUseCheckbox ? tableConfigs.length + 1 : tableConfigs.length}>
									<div className="flex justify-center items-center gap-2 text-danger-background">
										<WarningIcon />
										<span className="font-bold">{`Fetch error status: ${errorStatus}`}</span>
									</div>
								</TableCell>
							</TableRow>
						)}
						{!isError &&
							visibleItems.map((item, index) => (
								<Row
									key={item[mainKey]}
									item={item}
									isSelected={selectedItems.some((selectItem) => selectItem === item[mainKey])}
									handleSelect={handleSelectOneRow}
									handleContextMenu={handleContextMenu}
								/>
							))}
					</TableBody>
				</Table>
			</div>
		</React.Fragment>
	);
};

export default DataGridTable;
