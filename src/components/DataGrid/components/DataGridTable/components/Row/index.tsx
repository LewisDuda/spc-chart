'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TableRow, TableCell, Checkbox, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TABLE_CONFIG } from '@/models/tableConfig';
import { useToggleTableRowStatus } from '@/hooks';
import { useDataGridContext } from '@/context/DataGridProvider';

interface RowsProps {
	item: any;
	isSelected: boolean;
	handleSelect: (event: any, item: any) => void;
	handleContextMenu: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, item: any) => void;
}

const Row = (props: RowsProps) => {
	const {
		mainKey,
		filteredTableConfigs: tableConfigs,
		rowDetails: RowDetails,
		rowDetailsProps: DetailsProps,
		page,
		itemsPerPage,
		isUseLookUpTable,
	} = useDataGridContext();
	const { rowDetails: isUseRowDetails } = isUseLookUpTable;

	let { item, isSelected, handleSelect, handleContextMenu } = props;

	const rowRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const { rowStatus, handleMouseOver, handleMouseOut } = useToggleTableRowStatus({ isSelected });

	const dataEntry = (item: any, key: TABLE_CONFIG) => {
		if (key?.fieldContentSetting) {
			return key.fieldContentSetting(item);
		} else {
			return item[key.fieldKey];
		}
	};

	useEffect(() => {
		setIsOpen(false);
	}, [page, itemsPerPage]);

	return (
		<>
			<TableRow
				ref={rowRef}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				className={rowStatus}
				selected={isSelected}
				onContextMenu={(event) => handleContextMenu(event, item)}
			>
				<TableCell>
					<Checkbox checked={isSelected} onChange={(event) => handleSelect(event, item[mainKey])} />
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-1">
						{isUseRowDetails ? (
							<div
								id="expand_details"
								className="w-max cursor-pointer"
								onClick={() => setIsOpen(!isOpen)}
							>
								{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</div>
						) : null}
						{dataEntry(item, tableConfigs[0])}
						{/* <div className="flex gap-1 pl-4 pr-2">
							{Actions &&
								Actions.map((action, index) => (
									<IconButton
										className="w-max cursor-pointer"
										key={index}
										onClick={() => action.func(item)}
									>
										{action.icon}
									</IconButton>
								))}
						</div> */}
					</div>
				</TableCell>
				{tableConfigs.slice(1).map((config, index) => (
					<TableCell key={index}>{dataEntry(item, config)}</TableCell>
				))}
			</TableRow>
			{isUseRowDetails && RowDetails && (
				<TableRow
					ref={rowRef}
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
					className={rowStatus}
					selected={isSelected}
				>
					<TableCell className="p-0" colSpan={tableConfigs.length + 2}>
						<Collapse in={isOpen} timeout="auto" unmountOnExit>
							<RowDetails item={item} {...DetailsProps} />
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default Row;
