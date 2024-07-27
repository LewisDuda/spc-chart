'use client';

import React, { useEffect } from 'react';
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tooltip, IconButton, Popover, Badge } from '@mui/material';
import { usePopper } from '@/hooks';
import { Columns, Exports, Filters, Tips } from './components';
import { FilterConditionsUtils } from '@/utils';
import { useDataGridContext } from '@/context/DataGridProvider';

const DataGridToolbar = () => {
	const { isLoading, filterConditions, isUseLookUpTable } = useDataGridContext();

	const { columns: isUseColumns, filters: isUseFilters, exports: isUseExports } = isUseLookUpTable;

	const {
		id: columns_id,
		isOpen: isColumnsOpen,
		anchorEl: columnsAnchorEl,
		handleOpen: columnsOpen,
		handleClose: columnsClose,
	} = usePopper({});
	const {
		id: filters_id,
		isOpen: isFiltersOpen,
		anchorEl: filtersAnchorEl,
		handleOpen: filtersOpen,
		handleClose: filtersClose,
	} = usePopper({});
	const {
		id: exports_id,
		isOpen: isExportsOpen,
		anchorEl: exportsAnchorEl,
		handleOpen: exportsOpen,
		handleClose: exportsClose,
	} = usePopper({});
	const {
		id: tips_id,
		isOpen: isTipsOpen,
		anchorEl: tipsAnchorEl,
		handleOpen: tipsOpen,
		handleClose: tipsClose,
	} = usePopper({});

	const handleClickColumnsOpen = (event: React.MouseEvent<HTMLElement>) => {
		columnsOpen(event);
	};

	const handleClickColumnsClose = () => {
		columnsClose();
	};

	const handleClickFiltersOpen = (event: React.MouseEvent<HTMLElement>) => {
		filtersOpen(event);
	};

	const handleClickFiltersClose = () => {
		filtersClose();
	};

	const handleClickExportsOpen = (event: React.MouseEvent<HTMLElement>) => {
		exportsOpen(event);
	};

	const handleClickExportsClose = () => {
		exportsClose();
	};

	const handleTipsOpen = (event: React.MouseEvent<HTMLElement>) => {
		tipsOpen(event);
	};

	const handleTipsClose = () => {
		tipsClose();
	};

	const badgeCount = FilterConditionsUtils.handleValidConditions(filterConditions).length;

	return (
		<div className="w-full flex items-center py-4 px-2 gap-1.5 ">
			<div className="w-full flex justify-between">
				<div>
					{isUseColumns && (
						<IconButton disabled={isLoading} onClick={(event) => handleClickColumnsOpen(event)}>
							<Tooltip title={<div className="tooltipTitle">Columns</div>}>
								<ViewColumnRoundedIcon className="text-2xl" />
							</Tooltip>
						</IconButton>
					)}
					{isUseFilters && (
						<IconButton disabled={isLoading} onClick={handleClickFiltersOpen}>
							<Tooltip title={<div className="tooltipTitle">Filters</div>}>
								<Badge badgeContent={badgeCount}>
									<FilterAltIcon className="text-2xl" />
								</Badge>
							</Tooltip>
						</IconButton>
					)}
					{isUseExports && (
						<IconButton disabled={isLoading} onClick={handleClickExportsOpen}>
							<Tooltip title={<div className="tooltipTitle">Download</div>}>
								<FileDownloadIcon className="text-2xl" />
							</Tooltip>
						</IconButton>
					)}
				</div>
				<div>
					<IconButton onClick={handleTipsOpen}>
						<Tooltip title={<div className="tooltipTitle">Tips</div>}>
							<HelpOutlineIcon className="text-2xl" />
						</Tooltip>
					</IconButton>
				</div>
			</div>
			<Popover
				id={columns_id}
				open={isColumnsOpen}
				anchorEl={columnsAnchorEl}
				onClose={handleClickColumnsClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Columns />
			</Popover>
			<Popover
				id={filters_id}
				open={isFiltersOpen}
				anchorEl={filtersAnchorEl}
				onClose={handleClickFiltersClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Filters handleClose={handleClickFiltersClose} />
			</Popover>
			<Popover
				id={exports_id}
				open={isExportsOpen}
				anchorEl={exportsAnchorEl}
				onClose={handleClickExportsClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Exports handleClose={handleClickExportsClose} />
			</Popover>
			<Popover
				id={tips_id}
				open={isTipsOpen}
				anchorEl={tipsAnchorEl}
				onClose={handleTipsClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Tips handleClose={handleTipsClose} />
			</Popover>
		</div>
	);
};

export default DataGridToolbar;
